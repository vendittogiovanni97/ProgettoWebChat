import { OAuth2Client } from 'google-auth-library';
import dotenv from "dotenv";
import { Request, Response } from "express";

dotenv.config();

// Inizializzazione del client OAuth2 con le credenziali della tua applicazione
const oauth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,     // ID cliente ottenuto dalla console Google Cloud
  process.env.GOOGLE_CLIENT_SECRET, // Segreto cliente ottenuto dalla console Google Cloud
  'https://tuodominio.com/api/auth/google/callback' // URL di callback dove Google reindirizzerà dopo l'autenticazione
);

// Funzione che genera l'URL di autenticazione Google a cui reindirizzare l'utente
export const getGoogleAuthURL = () => {
  // Definizione degli ambiti (scopes) che indicano quali informazioni/permessi richiediamo a Google
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile', // Richiede accesso alle informazioni del profilo (nome, foto, ecc.)
    'https://www.googleapis.com/auth/userinfo.email'    // Richiede accesso all'email dell'utente
  ];

  // Genera e restituisce l'URL di autenticazione con i parametri necessari
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',  // Richiede refresh_token per poter accedere anche quando l'utente è offline
    prompt: 'consent',       // Forza la visualizzazione della schermata di consenso ogni volta
    scope: scopes            // Gli ambiti definiti sopra
  });
};

// Funzione che gestisce il callback dopo che l'utente ha effettuato l'accesso su Google
export const handleGoogleCallback = async (req: Request, res: Response) => {
  // Estrae il codice di autorizzazione dalla query string dell'URL di callback
  const { code } = req.query;
  
  try {
    // Scambia il codice di autorizzazione con i token di accesso
    // Questo è un passaggio cruciale: Google verifica il codice e fornisce i token solo se è valido
    const { tokens } = await oauth2Client.getToken(code as string);
    
    // Imposta i token ottenuti come credenziali del client OAuth2
    // Questo permette di utilizzare il client per le richieste autenticate successive
    oauth2Client.setCredentials(tokens);
    
    // Crea un nuovo client per ottenere le informazioni dell'utente
    // (si potrebbe anche usare lo stesso client oauth2Client)
    const userInfoClient = new OAuth2Client();
    userInfoClient.setCredentials(tokens);
    
    // Effettua una richiesta all'endpoint di Google per ottenere le informazioni dell'utente
    // Utilizza il token di accesso nell'header di autorizzazione
    const userInfoResponse = await fetch(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}` // Utilizza il token di accesso per autenticare la richiesta
        }
      }
    );
    
    // Converte la risposta in formato JSON
    const userData = await userInfoResponse.json();
    
    // A questo punto hai le informazioni dell'utente (email, nome, ID Google, ecc.)
    // Qui dovresti implementare la tua logica personalizzata:
    // 1. Verifica se l'utente esiste già nel tuo database
    // 2. Se non esiste, crealo
    // 3. Genera un token JWT firmato per la tua applicazione
    // 4. Imposta il token in un cookie o restituiscilo al client
    
    // Esempi di dati disponibili in userData:
    // - userData.sub: l'ID Google dell'utente
    // - userData.email: l'email dell'utente
    // - userData.name: il nome completo
    // - userData.given_name: il nome
    // - userData.family_name: il cognome
    // - userData.picture: URL della foto profilo

    // Esempio di codice che potresti aggiungere:
    /*
    let user = await dbClient.user.findUnique({
      where: { googleId: userData.sub }
    });

    if (!user) {
      // L'utente non esiste, crealo
      user = await dbClient.user.create({
        data: {
          googleId: userData.sub,
          email: userData.email,
          username: userData.name,
          // altri campi del tuo schema utente...
        }
      });
    }

    // Genera un JWT per la sessione nella tua app
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.TOKEN_SECRET as string,
      { expiresIn: '7d' }
    );

    // Imposta il token in un cookie
    res.cookie('auth_token', token, { 
      httpOnly: true, 
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 giorni
    });
    */

    // Reindirizza l'utente alla dashboard o a un'altra pagina post-login
    res.redirect('/dashboard');
  } catch (error) {
    // Gestione degli errori durante il processo di autenticazione
    console.error('Errore nell\'autenticazione Google:', error);
    // Reindirizza a una pagina di login con un parametro di errore
    res.redirect('/login?error=auth_failed');
  }
};
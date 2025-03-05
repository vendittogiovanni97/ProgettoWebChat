import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Carica le variabili d'ambiente
dotenv.config();

export class EmailManager {
    private transporter: nodemailer.Transporter;
    private static instance: EmailManager;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || '465'),
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  || "krlg vutf ozwy binw"
            }
        }); 
    }

    // Metodo di validazione email
    private validateEmail(email: string): boolean {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Metodo per inviare email con validazione
    async sendEmail(to: string[], subject: string, text: string) {
        try {
            // Filtra e valida gli indirizzi email
            const validEmails = to.filter(email => this.validateEmail(email));

            if (validEmails.length === 0) {
                throw new Error('Nessun indirizzo email valido');
            }

            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: validEmails,
                subject: subject,
                text: text
            });

            console.log('Email inviata:', info.messageId);
            return info;
        } catch (error) {
            console.error('Errore nell\'invio email:', error);
            throw error;
        }
    }

    // Metodo statico per ottenere l'istanza singleton
    public static getInstance(): EmailManager {
        if (!EmailManager.instance) {
            EmailManager.instance = new EmailManager();
        }
        return EmailManager.instance;
    }

    // Metodo di configurazione opzionale
    public static config(options?: {
        host?: string, 
        port?: number, 
        user?: string, 
        pass?: string
    }) {
        if (options) {
            process.env.SMTP_HOST = options.host || process.env.SMTP_HOST;
            process.env.SMTP_PORT = options.port?.toString() || process.env.SMTP_PORT;
            process.env.EMAIL_USER = options.user || process.env.EMAIL_USER;
            process.env.EMAIL_PASS = options.pass || process.env.EMAIL_PASS;
        }
        return this.getInstance();
    }
}
/*
async function inviaEmailDiTest() {
    try {
        const emailManager = EmailManager.getInstance();

        const settingEmail = {
            to: ["maggioremario96@gmail.com", "vendittogiovanni97@hotmail.it"],
            subject: "Test email",
            text: "Questo è un test di invio email"
        };

        await emailManager.sendEmail(
            settingEmail.to, 
            settingEmail.subject, 
            settingEmail.text
        );

        console.log('Email inviata con successo!');
    } catch (error) {
        console.error('Errore durante l\'invio dell\'email:', error);
    }
}

// Chiamata alla funzione di test
inviaEmailDiTest();
*/
export default EmailManager;
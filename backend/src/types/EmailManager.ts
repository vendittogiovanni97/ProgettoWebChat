import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); 
/*     /////// DA INSERIRE IN VARIABILI D'AMBIENTE////
EMAIL_USER="pippopippopippo729"
EMAIL_PASS="krlg vutf ozwf binw"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=465*/

export class EmailManager {
    private transporter: nodemailer.Transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,  
            secure: true, 
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        }); 
    }

    async sendEmail(to: string[], subject: string, text: string) {
        try {
            const info = await this.transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: to,
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

    public static getInstance(): EmailManager {
        if (!EmailManager.instance) {
            EmailManager.instance = new EmailManager();
        }
        return EmailManager.instance;
    }

    private static instance: EmailManager;
}

const emailManager = EmailManager.getInstance(); //SINGLETON CHE AVVIA SESSIONE
const settingEmail = {
    to: ["maggioremario96@gmail.com"],
    subject: "Test email",
    text: "Test email"
};

emailManager.sendEmail(   ///invio delle mail 
    settingEmail.to, 
    settingEmail.subject, 
    settingEmail.text
).catch(console.error);
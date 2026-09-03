import nodemailer from 'nodemailer';

const sendEmail = async (to, subject, text) => {
    try {
        
        const transporter = nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'medifind42@gmail.com', 
                pass: 'asiucvsnigmadkrm'
            }
        });
       

        const mailOptions = {
            from: '"MediFind" <no-reply@medifind.com>',
            to: to,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully to:", to);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

export default sendEmail;

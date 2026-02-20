const nodeMailer = require('nodemailer');


module.exports = async function sendEmail(userEmail, subject, htmlTemplate) {
    try {
        // Create a transporter
        const transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,

        }

    });
        // Send the email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        };
       const info= await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${info.response}`);
    } catch (error) {
        console.error(`Error sending email to ${userEmail}:`, error);
        throw error;
    }
};
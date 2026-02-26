const nodeMailer = require('nodemailer');

module.exports = async function sendEmail(userEmail, subject, htmlTemplate) {
    try {
        // إنشاء الـ transporter بإعدادات أكثر صرامة للإنتاج
        const transporter = nodeMailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587, // استخدام المنفذ الآمن SSL
            secure: false, // يجب أن يكون false للمنفذ 587
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                // هذا السطر يمنع فشل الإرسال بسبب شهادات الأمان في السيرفرات السحابية
                rejectUnauthorized: false 
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully: ${info.response}`);
    } catch (error) {
        // طباعة الخطأ كاملًا في Logs الـ Render لمعرفة السبب الحقيقي
        console.error(`Detailed Error sending email to ${userEmail}:`, error);
        throw error;
    }
};
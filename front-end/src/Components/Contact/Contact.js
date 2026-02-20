import React, { useState } from "react";
import Title from "../Title/Title";
import "./Contact.css";
import { useDispatch } from "react-redux";
import { createMessage } from "../../redux/ApiCalls/messageApiCall";
import { toast } from "react-toastify"; // إذا كنت تستخدمها للإشعارات

const Contact = () => {
  const lng = "en";
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !description) {
        return toast.error(lng === "en" ? "Please fill all fields" : "يرجى ملء جميع الحقول");
    }

    setLoading(true);
    try {
        // ننتظر نتيجة الـ dispatch (إذا كانت ترجع Promise)
        await dispatch(createMessage({ username, email, description }));
        
        // تصفير الفورم في حال النجاح فقط
        setUsername("");
        setEmail("");
        setDescription("");
        // toast.success(lng === "en" ? "Message sent successfully!" : "تم إرسال الرسالة بنجاح!");
    } catch (error) {
        // toast.error("Error sending message");
    } finally {
        setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <div className="container">
        <Title
          title={lng === "en" ? "Get in Touch" : "تواصل معي"}
          subtitle={
            lng === "en"
              ? "Feel free to contact me for any project or collaboration."
              : "لا تتردد في التواصل معي لأي مشروع أو تعاون..."
          }
        />

        <form onSubmit={handleSubmit}>
          <div className="w-49">
            <label htmlFor="name">{lng === "en" ? "Full Name:" : "الاسم الكامل:"}</label>
            <input
              id="name"
              className="form-input"
              type="text"
              required
              placeholder={lng === "en" ? "Enter your name" : "أدخل اسمك"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="w-49">
            <label htmlFor="email">{lng === "en" ? "Email Address:" : "البريد الإلكتروني:"}</label>
            <input
              id="email"
              className="form-input"
              type="email"
              required
              placeholder={lng === "en" ? "Enter your email" : "أدخل بريدك الإلكتروني"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="w-100">
            <label htmlFor="message">{lng === "en" ? "Your Message:" : "رسالتك:"}</label>
            <textarea
              id="message"
              required
              placeholder={
                lng === "en"
                  ? "How can I help you?"
                  : "كيف يمكنني مساعدتك؟"
              }
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className="secondary-btn" type="submit" disabled={loading}>
              {loading
                ? (lng === "en" ? "Sending..." : "جاري الإرسال...")
                : (lng === "en" ? "Send Message" : "أرسل الرسالة")}
            </button>
          </div>
        </form>

        <div className="contact-links">
          {/* إضافة target="_blank" ضروري جداً لمواقع الـ Portfolio */}
          <a className="facebook" href="https://www.facebook.com/profile.php?id=100008293668112" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-facebook"></i> Facebook
          </a>
          <a className="whatsapp" href="https://wa.me/+963933519382" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-whatsapp"></i> Whatsapp
          </a>
          <a className="telegram" href="https://t.me/Shadi_Alhamdo" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-telegram"></i> Telegram
          </a>
          <a className="github" href="https://github.com/ShadiAlhamdo" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i> GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
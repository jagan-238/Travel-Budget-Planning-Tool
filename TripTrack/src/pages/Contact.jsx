import React, { useState } from "react";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaCommentDots,
  FaPaperPlane,
} from "react-icons/fa";
import {
  FiMail,
  FiInstagram,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
} from "react-icons/fi";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks for contacting us, ${formData.name}! We'll get back to you soon.`);
    setFormData({ name: "", email: "", message: "" });
  };

  const styles = {
    container: {
      maxWidth: 500,
      margin: "50px auto",
      padding: "2rem",
      borderRadius: 16,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#ffffff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#000",  // full black for all text
    },
    header: {
      textAlign: "center",
      marginBottom: "0.5rem",
      fontWeight: "700",
      fontSize: "2rem",
      color: "#000",  // full black
    },
    description: {
      textAlign: "center",
      marginBottom: "2rem",
      color: "#000",  // full black
      fontSize: "1.1rem",
    },
    infoSection: {
      marginBottom: "2rem",
      lineHeight: 1.6,
      fontSize: "1rem",
      color: "#000",  // full black
    },
    icon: {
      color: "#00796b",
      marginRight: 8,
      verticalAlign: "middle",
    },
    link: {
      color: "#00796b",
      textDecoration: "none",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
    },
    inputGroup: {
      display: "flex",
      alignItems: "center",
      border: "1px solid black",
      borderRadius: 10,
      backgroundColor: "white",
      padding: "10px 15px",
      boxShadow: "inset 0 1px 3px rgba(0,0,0,0.06)",
      transition: "border-color 0.3s ease",
    },
    inputIcon: {
      color: "#00796b",
      marginRight: 12,
      fontSize: 20,
      flexShrink: 0,
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "1rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "transparent",
      color: "#000",  // input text full black
    },
    textarea: {
      flex: 1,
      border: "none",
      outline: "none",
      fontSize: "1rem",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "transparent",
      resize: "vertical",
      minHeight: 100,
      color: "#000", // textarea text full black
    },
    button: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#4a90e2",
      color: "#fff",
      fontWeight: "700",
      fontSize: "1rem",
      padding: "12px 24px",
      borderRadius: 10,
      border: "2px solid black",
      cursor: "pointer",
      transition: "background-color 0.3s ease, color 0.3s ease",
      userSelect: "none",
    },
    buttonHover: {
      backgroundColor: "#3a78c2",
      color: "#e0e7ff",
    },
    socialHeader: {
      marginTop: "3rem",
      textAlign: "center",
      fontWeight: "700",
      fontSize: "1.5rem",
      color: "#000",  // full black
    },
    socialLinks: {
      display: "flex",
      justifyContent: "center",
      gap: "24px",
      marginTop: "1rem",
      fontSize: "1.8rem",
    },
    socialIcon: {
      color: "#00796b",
      transition: "color 0.3s ease",
      textDecoration: "none",
    },
    socialIconHover: {
      color: "#004d40",
    },
    mapPlaceholder: {
      marginTop: "3rem",
      padding: "2rem",
      border: "1px dashed #00796b",
      borderRadius: 12,
      textAlign: "center",
      fontSize: "1.1rem",
      color: "#00796b",
      userSelect: "none",
    },
  };

  const [btnHover, setBtnHover] = React.useState(false);
  const [socialHover, setSocialHover] = React.useState(null);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📬 Contact Us</h1>
      <p style={styles.description}>
        Have questions or feedback? We'd love to hear from you!
      </p>

      <div style={styles.infoSection}>
        <p>
          <FaEnvelope style={styles.icon} /> Email:{" "}
          <a href="mailto:support@travelbudgetplanner.com" style={styles.link}>
            support@travelbudgetplanner.com
          </a>
        </p>
        <p>
          <FaPhoneAlt style={styles.icon} /> Phone:{" "}
          <a href="tel:+919876543210" style={styles.link}>
            +91 98765 43210
          </a>
        </p>
        <p>
          <FaMapMarkerAlt style={styles.icon} /> Address: 123 Budget Lane,
          Wanderlust City, India
        </p>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <FaUser style={styles.inputIcon} />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <FiMail style={styles.inputIcon} />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <FaCommentDots style={styles.inputIcon} />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
            style={styles.textarea}
          />
        </div>

        <button
          type="submit"
          style={btnHover ? { ...styles.button, ...styles.buttonHover } : styles.button}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          <FaPaperPlane style={{ marginRight: "8px" }} /> Send Message
        </button>
      </form>

      <h2 style={styles.socialHeader}>🌐 Connect with Us</h2>
      <div style={styles.socialLinks}>
        {[FiFacebook, FiTwitter, FiInstagram, FiLinkedin].map((Icon, i) => (
          <a
            key={i}
            href={
              i === 0
                ? "https://facebook.com"
                : i === 1
                ? "https://twitter.com"
                : i === 2
                ? "https://instagram.com"
                : "https://linkedin.com"
            }
            target="_blank"
            rel="noreferrer"
            style={
              socialHover === i
                ? { ...styles.socialIcon, ...styles.socialIconHover }
                : styles.socialIcon
            }
            onMouseEnter={() => setSocialHover(i)}
            onMouseLeave={() => setSocialHover(null)}
            aria-label={`Link to ${Icon.displayName || "social"}`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </div>
  );
}

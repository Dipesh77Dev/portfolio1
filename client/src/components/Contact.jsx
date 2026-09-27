import React, { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Connect to your MERN backend API endpoint here
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 1200);
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subTag}>// Let's Connect</span>
          <h2 className={styles.title}>Start A Conversation</h2>
          <p className={styles.desc}>
            Available for high-impact Frontend, MERN Stack, and Web Engineering opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <input 
              type="text" 
              required 
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className={styles.input}
            />
            <input 
              type="email" 
              required 
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className={styles.input}
            />
          </div>

          <textarea 
            rows="5" 
            required 
            placeholder="Tell me about your project or opportunity..."
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className={styles.textarea}
          ></textarea>

          <button type="submit" className={styles.submitBtn}>
            Send Message ➔
          </button>

          {status && <p className={styles.status}>{status}</p>}
        </form>
      </div>
    </section>
  );
}
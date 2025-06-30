import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import './Contact.css';

const initialState = { name: '', email: '', message: '' };

const SERVICE_ID = 'your_service_id'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'your_template_id'; // Replace with your EmailJS template ID
const USER_ID = 'your_user_id'; // Replace with your EmailJS user ID (public key)

const Contact: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    if (form.name && form.email && form.message) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
          },
          USER_ID
        );
        setStatus('success');
        setForm(initialState);
      } catch {
        setStatus('error');
      }
    } else {
      setStatus('error');
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }} // Faster
      viewport={{ once: true, amount: 0.2 }}
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Parallax/gradient background layer */}
      <div className="contact-bg-parallax" aria-hidden="true" />
      <div className="contact-container">
        <h2 className="contact-title">Contact</h2>
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} // Faster
          viewport={{ once: true }}
          style={{ willChange: 'transform, opacity' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="contact-input"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="contact-input"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={5}
            className="contact-input"
            value={form.message}
            onChange={handleChange}
            required
          />
          <motion.button
            type="submit"
            className="contact-submit-btn"
            whileTap={{ scale: 0.95 }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? <FaSpinner className="contact-spinner" /> : <span>Send Message</span>}
          </motion.button>
          {status === 'success' && (
            <motion.div className="contact-status contact-status-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FaCheckCircle /> Thank you! Your message has been sent.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div className="contact-status contact-status-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FaExclamationCircle /> Please fill in all fields correctly or try again later.
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;

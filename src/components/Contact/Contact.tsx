import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { FaCheckCircle, FaExclamationCircle, FaSpinner } from 'react-icons/fa';
import './Contact.css';

const initialState = { name: '', email: '', message: '' };

const SERVICE_ID = 'service_4gx9jau'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_30bq9w5'; // Replace with your EmailJS template ID
const USER_ID = 'SuGitmy9neHJIi0UQ'; // Replace with your EmailJS user ID (public key)

const Contact: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);
    if (!form.name.trim()) {
      setStatus('error');
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!form.email.trim()) {
      setStatus('error');
      setErrorMsg('Please enter your email.');
      return;
    }
    if (!validateEmail(form.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!form.message.trim()) {
      setStatus('error');
      setErrorMsg('Please enter your message.');
      return;
    }
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
      setErrorMsg('Failed to send email. Please try again later.');
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
          {status === 'error' && errorMsg && (
            <motion.div className="contact-status contact-status-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FaExclamationCircle /> {errorMsg}
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;

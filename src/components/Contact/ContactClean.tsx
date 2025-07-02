import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaSpinner, 
  FaEnvelope, 
  FaUser, 
  FaCommentDots,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaTwitter
} from 'react-icons/fa';

const initialState = { name: '', email: '', message: '' };

// EmailJS configuration - using environment variables
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const ContactClean: React.FC = () => {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [emailJsInitialized, setEmailJsInitialized] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
        setEmailJsInitialized(true);
        console.log('EmailJS initialized successfully');
      } catch (error) {
        console.error('EmailJS initialization error:', error);
        setEmailJsInitialized(false);
      }
    } else {
      console.error('EmailJS PUBLIC_KEY not found in environment variables');
      setEmailJsInitialized(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg(null);
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!form.name.trim()) {
      setErrorMsg('Please enter your name.');
      return false;
    }
    if (form.name.trim().length < 2) {
      setErrorMsg('Name must be at least 2 characters.');
      return false;
    }
    if (!form.email.trim()) {
      setErrorMsg('Please enter your email.');
      return false;
    }
    if (!validateEmail(form.email)) {
      setErrorMsg('Please enter a valid email address.');
      return false;
    }
    if (!form.message.trim()) {
      setErrorMsg('Please enter your message.');
      return false;
    }
    if (form.message.trim().length < 10) {
      setErrorMsg('Message must be at least 10 characters.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg(null);

    if (!validateForm()) {
      setStatus('error');
      return;
    }

    // Check if EmailJS is properly configured
    if (!emailJsInitialized || !SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.error('EmailJS configuration missing:', {
        initialized: emailJsInitialized,
        serviceId: !!SERVICE_ID,
        templateId: !!TEMPLATE_ID,
        publicKey: !!PUBLIC_KEY
      });
      setStatus('error');
      setErrorMsg('Email service is not properly configured. Please contact me directly.');
      return;
    }

    try {
      const templateParams = {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        message: form.message.trim(),
        to_name: 'Aadarsh Kumar',
        reply_to: form.email.trim(),
      };

      console.log('Sending email with params:', templateParams);
      
      const response = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      setStatus('success');
      setForm(initialState);
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('Email send error:', error);
      setStatus('error');
      
      // Provide more specific error messages
      if (error instanceof Error) {
        if (error.message.includes('Invalid public key')) {
          setErrorMsg('Email service configuration error. Please contact me directly.');
        } else if (error.message.includes('Invalid service ID')) {
          setErrorMsg('Email service unavailable. Please try again later or contact me directly.');
        } else {
          setErrorMsg(`Failed to send email: ${error.message}. Please try again or contact me directly.`);
        }
      } else {
        setErrorMsg('Failed to send email. Please try again later or contact me directly.');
      }
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: <FaGithub />,
      url: 'https://github.com/aadarshk',
      color: 'var(--text-primary)'
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      url: 'https://linkedin.com/in/aadarshk',
      color: '#0077b5'
    },
    {
      name: 'Twitter',
      icon: <FaTwitter />,
      url: 'https://twitter.com/aadarshk',
      color: '#1da1f2'
    }
  ];

  return (
    <section className="section-container contact-section" id="contact" aria-labelledby="contact-title">
      {/* Enhanced Contact Background */}
      <div className="contact-section-bg" />
      
      {/* Floating Decorations */}
      <div className="floating-decoration-contact"></div>
      <div className="floating-decoration-contact"></div>
      <div className="floating-decoration-contact"></div>
      <div className="floating-decoration-contact"></div>
      
      <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Section title */}
        <motion.h2 
          id="contact-title"
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Let's Work Together
        </motion.h2>
        
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style = {{
            left: '0',
            right: '0',
            textAlign: 'center',
            margin: '0 auto',
            color: 'var(--text-secondary)',
          }}
        >
          Ready to bring your ideas to life? Let's discuss your next project
        </motion.p>

        {/* Contact form */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            padding: '3rem',
            marginTop: '3rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Name field */}
              <motion.div
                className="contact-form-field"
                style={{ position: 'relative' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: focusedField === 'name' || form.name ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                  fontSize: '1.1rem',
                  transition: 'var(--transition-smooth)',
                  zIndex: 1
                }}>
                  <FaUser />
                </div>
                
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  value={form.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  maxLength={50}
                  aria-label="Your name"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    fontSize: '1rem',
                    background: 'var(--glass-bg-subtle)',
                    border: `2px solid ${focusedField === 'name' ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'var(--transition-smooth)',
                    backdropFilter: 'var(--glass-backdrop)'
                  }}
                />
              </motion.div>

              {/* Email field */}
              <motion.div
                className="contact-form-field"
                style={{ position: 'relative' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: focusedField === 'email' || form.email ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                  fontSize: '1.1rem',
                  transition: 'var(--transition-smooth)',
                  zIndex: 1
                }}>
                  <FaEnvelope />
                </div>
                
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={handleBlur}
                  required
                  maxLength={100}
                  aria-label="Your email address"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    fontSize: '1rem',
                    background: 'var(--glass-bg-subtle)',
                    border: `2px solid ${focusedField === 'email' ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'var(--transition-smooth)',
                    backdropFilter: 'var(--glass-backdrop)'
                  }}
                />
              </motion.div>

              {/* Message field */}
              <motion.div
                className="contact-form-field"
                style={{ position: 'relative' }}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '1rem',
                  color: focusedField === 'message' || form.message ? 'var(--accent-primary)' : 'var(--text-tertiary)',
                  fontSize: '1.1rem',
                  transition: 'var(--transition-smooth)',
                  zIndex: 1
                }}>
                  <FaCommentDots />
                </div>
                
                <textarea
                  name="message"
                  placeholder="Your Message *"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  required
                  maxLength={1000}
                  rows={5}
                  aria-label="Your message"
                  disabled={status === 'loading'}
                  style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    fontSize: '1rem',
                    background: 'var(--glass-bg-subtle)',
                    border: `2px solid ${focusedField === 'message' ? 'var(--accent-primary)' : 'var(--glass-border)'}`,
                    borderRadius: 'var(--border-radius)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    transition: 'var(--transition-smooth)',
                    backdropFilter: 'var(--glass-backdrop)',
                    resize: 'vertical',
                    minHeight: '120px',
                    fontFamily: 'inherit'
                  }}
                />
                
                <div style={{
                  position: 'absolute',
                  bottom: '0.5rem',
                  right: '1rem',
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)'
                }}>
                  {form.message.length}/1000
                </div>
              </motion.div>

              {/* Status Messages */}
              <AnimatePresence>
                {status === 'error' && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}
                    role="alert"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 'var(--border-radius)',
                      color: '#ef4444'
                    }}
                  >
                    <FaExclamationCircle />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}
                    role="alert"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      borderRadius: 'var(--border-radius)',
                      color: '#22c55e'
                    }}
                  >
                    <FaCheckCircle />
                    <span>Thank you! Your message has been sent successfully. I'll get back to you soon!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <motion.button
                type="submit"
                className="btn-primary"
                disabled={status === 'loading' || status === 'success'}
                whileHover={status === 'idle' || status === 'error' ? { scale: 1.02, y: -2 } : {}}
                whileTap={status === 'idle' || status === 'error' ? { scale: 0.98 } : {}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  cursor: status === 'loading' || status === 'success' ? 'not-allowed' : 'pointer',
                  opacity: status === 'loading' || status === 'success' ? 0.7 : 1
                }}
              >
                {status === 'loading' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FaSpinner />
                    </motion.div>
                    Sending...
                  </>
                ) : status === 'success' ? (
                  <>
                    <FaCheckCircle />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Alternative contact methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          style={{
            marginTop: '3rem',
            textAlign: 'center'
          }}
        >
          <p style={{
            fontSize: '1rem',
            color: 'var(--text-secondary)',
            marginBottom: '1.5rem'
          }}>
            Or reach out directly
          </p>
          
          <motion.a 
            href="mailto:aadarsh11.official@gmail.com"
            className="glass-card"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 2rem',
              textDecoration: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.1rem',
              fontWeight: '500',
              marginBottom: '2rem',
              transition: 'var(--transition-smooth)'
            }}
            aria-label="Send email directly"
          >
            <FaEnvelope style={{ color: 'var(--accent-primary)' }} />
            aadarsh11.official@gmail.com
          </motion.a>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '2rem'
            }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '50px',
                  height: '50px',
                  textDecoration: 'none',
                  color: social.color,
                  fontSize: '1.2rem',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label={`Visit my ${social.name} profile`}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactClean;

import emailjs from '@emailjs/browser';

// EmailJS Test Function
export const testEmailJS = async () => {
  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  console.log('EmailJS Configuration Check:');
  console.log('SERVICE_ID:', SERVICE_ID);
  console.log('TEMPLATE_ID:', TEMPLATE_ID);
  console.log('PUBLIC_KEY:', PUBLIC_KEY);

  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.error('Missing EmailJS configuration!');
    return false;
  }

  try {
    // Initialize EmailJS
    emailjs.init(PUBLIC_KEY);
    console.log('EmailJS initialized successfully');

    // Test email parameters
    const testParams = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      message: 'This is a test message from the portfolio contact form.',
      to_name: 'Aadarsh Kumar',
      reply_to: 'test@example.com'
    };

    // Send test email
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, testParams, PUBLIC_KEY);
    console.log('Test email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('EmailJS test failed:', error);
    return false;
  }
};

// Call this function in development to test EmailJS
if (import.meta.env.DEV) {
  console.log('EmailJS test available. Call testEmailJS() in console to test.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).testEmailJS = testEmailJS;
}

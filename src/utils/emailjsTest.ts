// EmailJS Test Utility
// Use this in browser console to test EmailJS configuration

const testEmailJS = async () => {
  console.log('🧪 Testing EmailJS Configuration...');
  
  // Check environment variables
  const config = {
    SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  };
  
  console.log('📋 Environment Variables:', {
    SERVICE_ID: config.SERVICE_ID ? '✅ Set' : '❌ Missing',
    TEMPLATE_ID: config.TEMPLATE_ID ? '✅ Set' : '❌ Missing',
    PUBLIC_KEY: config.PUBLIC_KEY ? '✅ Set' : '❌ Missing'
  });
  
  if (!config.SERVICE_ID || !config.TEMPLATE_ID || !config.PUBLIC_KEY) {
    console.error('❌ Missing environment variables. Check Vercel settings.');
    return false;
  }
  
  try {
    // Import EmailJS
    const emailjs = await import('@emailjs/browser');
    
    // Initialize EmailJS
    emailjs.default.init(config.PUBLIC_KEY);
    console.log('✅ EmailJS initialized successfully');
    
    // Test email parameters
    const testParams = {
      from_name: 'Test User',
      from_email: 'test@example.com',
      message: 'This is a test message from the portfolio contact form.',
      to_name: 'Aadarsh Kumar',
      reply_to: 'test@example.com'
    };
    
    console.log('📤 Sending test email...');
    
    const response = await emailjs.default.send(
      config.SERVICE_ID,
      config.TEMPLATE_ID,
      testParams,
      config.PUBLIC_KEY
    );
    
    console.log('✅ Test email sent successfully!', response);
    return true;
    
  } catch (error) {
    console.error('❌ EmailJS test failed:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('Invalid public key')) {
        console.error('🔑 Public key is invalid. Check your EmailJS account.');
      } else if (error.message.includes('Invalid service ID')) {
        console.error('🔧 Service ID is invalid. Check your EmailJS service.');
      } else if (error.message.includes('Invalid template ID')) {
        console.error('📝 Template ID is invalid. Check your EmailJS template.');
      }
    }
    
    return false;
  }
};

// Quick environment check
const quickCheck = () => {
  console.log('🔍 Quick EmailJS Environment Check:');
  console.log('SERVICE_ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID);
  console.log('TEMPLATE_ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
  console.log('PUBLIC_KEY:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  console.log('Environment:', import.meta.env.MODE);
};

// Declare global window methods
declare global {
  interface Window {
    testEmailJS: typeof testEmailJS;
    quickCheck: typeof quickCheck;
  }
}

// Export for use in console
window.testEmailJS = testEmailJS;
window.quickCheck = quickCheck;

console.log('🔧 EmailJS Test Utility Loaded');
console.log('Run testEmailJS() or quickCheck() in console to test');

export { testEmailJS, quickCheck };

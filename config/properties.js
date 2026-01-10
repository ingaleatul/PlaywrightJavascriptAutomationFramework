// config/properties.js
export const properties = {
  // Application URLs
  baseURL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  loginPage: '/web/index.php/auth/login',
  
  // Browser Configuration
  browser: {
    timeout: 30000,
    navigationTimeout: 30000,
  },

  // Test Data
  validCredentials: {
    username: 'Admin',
    password: 'admin123',
  },

  // Logging
  logLevel: process.env.LOG_LEVEL || 'INFO', // INFO, DEBUG, ERROR, WARN
  
  // Screenshot and Video
  screenshotOnFailure: true,
  videoOnFailure: true,
  
  // Reporting
  reportPath: './test-results',
  allureReportPath: './allure-results',

  // Retry Configuration
  maxRetries: 2,
  timeout: 30000,
};

export default properties;

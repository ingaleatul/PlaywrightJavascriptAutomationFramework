// pages/login-page.js
import { BasePage } from './base-page.js';

export class LoginPage extends BasePage {
  // Selectors
  usernameInput = 'input[name="username"]';
  passwordInput = 'input[name="password"]';
  loginButton = 'button[type="submit"]';
  errorMessage = '.oxd-alert-content';
  pageHeading = 'h5.oxd-text';
  rememberMeCheckbox = 'input[name="rememberMe"]';
  forgotPasswordLink = 'a:has-text("Forgot your password?")';
  usernameError = '.oxd-input-field-error';
  socialLoginButtons = '.oxd-form__buttons button';

  async navigateToLogin() {
    try {
      this.logger.info('Navigating to login page');
      await this.goto('/web/index.php/auth/login');
      await this.waitForElement(this.usernameInput, 30000);
      this.logger.info('Login page loaded successfully');
    } catch (error) {
      this.logger.error('Failed to navigate to login page', error.message);
      throw error;
    }
  }

  async enterUsername(username) {
    try {
      this.logger.info(`Entering username: ${username}`);
      await this.fill(this.usernameInput, username);
    } catch (error) {
      this.logger.error(`Failed to enter username`, error.message);
      throw error;
    }
  }

  async enterPassword(password) {
    try {
      this.logger.info(`Entering password`);
      await this.fill(this.passwordInput, password);
    } catch (error) {
      this.logger.error(`Failed to enter password`, error.message);
      throw error;
    }
  }

  async clickLoginButton() {
    try {
      this.logger.info('Clicking login button');
      await this.click(this.loginButton);
      // Wait for navigation or loading to complete
      await this.page.waitForLoadState('networkidle').catch(() => {
        // Continue even if navigation times out
      });
    } catch (error) {
      this.logger.error('Failed to click login button', error.message);
      throw error;
    }
  }

  async login(username, password) {
    try {
      this.logger.info(`Attempting login with username: ${username}`);
      await this.enterUsername(username);
      await this.enterPassword(password);
      await this.clickLoginButton();
      this.logger.info('Login action completed');
    } catch (error) {
      this.logger.error('Login failed', error.message);
      throw error;
    }
  }

  async getErrorMessage() {
    try {
      const errorVisible = await this.isVisible(this.errorMessage);
      if (errorVisible) {
        return await this.getText(this.errorMessage);
      }
      return null;
    } catch (error) {
      this.logger.debug('No error message found');
      return null;
    }
  }

  async isErrorDisplayed() {
    return this.isVisible(this.errorMessage);
  }

  async clickRememberMe() {
    try {
      this.logger.info('Clicking remember me checkbox');
      await this.click(this.rememberMeCheckbox);
    } catch (error) {
      this.logger.error('Failed to click remember me', error.message);
      throw error;
    }
  }

  async clickForgotPassword() {
    try {
      this.logger.info('Clicking forgot password link');
      await this.click(this.forgotPasswordLink);
    } catch (error) {
      this.logger.error('Failed to click forgot password', error.message);
      throw error;
    }
  }

  async isLoginPageDisplayed() {
    try {
      return await this.isVisible(this.usernameInput);
    } catch (error) {
      return false;
    }
  }

  async getPageHeading() {
    try {
      return await this.getText(this.pageHeading);
    } catch (error) {
      this.logger.error('Failed to get page heading', error.message);
      return null;
    }
  }

  async clearUsernameField() {
    try {
      this.logger.debug('Clearing username field');
      await this.page.fill(this.usernameInput, '');
    } catch (error) {
      this.logger.error('Failed to clear username field', error.message);
      throw error;
    }
  }

  async clearPasswordField() {
    try {
      this.logger.debug('Clearing password field');
      await this.page.fill(this.passwordInput, '');
    } catch (error) {
      this.logger.error('Failed to clear password field', error.message);
      throw error;
    }
  }
}

export default LoginPage;

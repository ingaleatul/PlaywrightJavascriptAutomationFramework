// pages/home-page.js
import { BasePage } from './base-page.js';

export class HomePage extends BasePage {
  // Selectors
  dashboardHeading = '.oxd-topbar-header-breadcrumb';
  userProfileMenu = '.oxd-userdropdown-tab';
  logoutButton = 'a[href="/web/index.php/auth/logout"]';
  sidebarMenu = '.oxd-sidebar-body';
  mainContent = '.oxd-layout-context';
  pageTitle = '.oxd-topbar-header-title h6';

  async isHomepageDisplayed() {
    try {
      const visible = await this.isVisible(this.mainContent);
      this.logger.info(`Homepage displayed: ${visible}`);
      return visible;
    } catch (error) {
      this.logger.error('Failed to check homepage display', error.message);
      return false;
    }
  }

  async getDashboardHeading() {
    try {
      const heading = await this.getText(this.dashboardHeading);
      this.logger.info(`Dashboard heading: ${heading}`);
      return heading;
    } catch (error) {
      this.logger.error('Failed to get dashboard heading', error.message);
      return null;
    }
  }

  async clickUserProfile() {
    try {
      this.logger.info('Clicking user profile menu');
      await this.click(this.userProfileMenu);
    } catch (error) {
      this.logger.error('Failed to click user profile', error.message);
      throw error;
    }
  }

  async logout() {
    try {
      this.logger.info('Logging out');
      await this.clickUserProfile();
      // Wait for dropdown to appear
      await this.page.waitForTimeout(500);
      await this.click(this.logoutButton);
      this.logger.info('Logout completed');
    } catch (error) {
      this.logger.error('Logout failed', error.message);
      throw error;
    }
  }

  async getPageTitle() {
    try {
      return await this.getText(this.pageTitle);
    } catch (error) {
      this.logger.error('Failed to get page title', error.message);
      return null;
    }
  }

  async isSidebarVisible() {
    return this.isVisible(this.sidebarMenu);
  }
}

export default HomePage;

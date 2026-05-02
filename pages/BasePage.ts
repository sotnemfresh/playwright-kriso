import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected readonly logo: Locator;
  protected readonly consentButton: Locator;
  protected readonly searchInput: Locator;
  protected readonly searchButton: Locator;

  constructor(protected page: Page) {
    this.logo = this.page.locator('.logo-icon');
    this.consentButton = this.page.getByRole('button', { name: 'Nõustun' });
    this.searchInput = this.page.locator('#top-search-text');
    this.searchButton = this.page.locator('#top-search-btn-wrap');
  }

  async acceptCookies() {
    const isVisible = await this.consentButton.isVisible({ timeout: 5_000 }).catch(() => false);

    if (isVisible) {
      await this.consentButton.click();
      await this.page.waitForLoadState('networkidle');
    }
  }

  async verifyLogo() {
    await expect(this.logo).toBeVisible();
  }

  protected async resolveSearchInput(): Promise<Locator> {
    const isVisible = await this.searchInput.isVisible({ timeout: 5_000 }).catch(() => false);

    if (isVisible) {
      return this.searchInput;
    }

    const fallbackInput = this.page.getByRole('textbox').first();
    await expect(fallbackInput).toBeVisible();
    return fallbackInput;
  }
  
  async searchByKeyword(keyword: string) {
    const searchInput = await this.resolveSearchInput();
    const buttonVisible = await this.searchButton.isVisible({ timeout: 3_000 }).catch(() => false);
    await searchInput.click();
    await searchInput.fill(keyword);

    if (buttonVisible) {
      await this.searchButton.click();
      return;
    }
  }
}

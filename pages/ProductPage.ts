import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private readonly productTitle: Locator;
  constructor(page: Page) {
    super(page);
    this.productTitle = this.page.getByRole('heading', { name: /Gone Girl/i });
  }

  //define locators and implement action methods
    async verifyGoneGirlTitle() {
    await expect(this.productTitle).toBeVisible();
  }
}

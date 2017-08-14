import { Test430Page } from './app.po';

describe('test430 App', () => {
  let page: Test430Page;

  beforeEach(() => {
    page = new Test430Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

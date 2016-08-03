import { ChatAfPage } from './app.po';

describe('chat-af App', function() {
  let page: ChatAfPage;

  beforeEach(() => {
    page = new ChatAfPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

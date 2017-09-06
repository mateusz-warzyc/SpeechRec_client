import { SpeechRecClientPage } from './app.po';

describe('speech-rec-client App', () => {
  let page: SpeechRecClientPage;

  beforeEach(() => {
    page = new SpeechRecClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});

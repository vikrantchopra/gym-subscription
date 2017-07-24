import { GymSubscriptionPage } from './app.po';

describe('gym-subscription App', () => {
  let page: GymSubscriptionPage;

  beforeEach(() => {
    page = new GymSubscriptionPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

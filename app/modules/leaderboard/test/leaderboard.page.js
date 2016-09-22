export default class LeaderboardPage {
  constructor() {
    this.url = '/#/';
  }

  get() {
    return browser.get(this.url);
  }
}
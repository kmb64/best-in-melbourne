import LeaderboardPage from './leaderboard.page';

describe('Leaderboard', () => {

  const leaderboardPage = new LeaderboardPage();

  beforeEach(() => {
    leaderboardPage.get();
  });

  it('should do stuff', () => {
    expect(true).toBe(true);
  });

});
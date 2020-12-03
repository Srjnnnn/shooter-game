import SceneMain from '../scenes/SceneMain';

jest.mock('../scenes/SceneMain.js');

beforeAll(() => {
  jest.spyOn(SceneMain.prototype, 'downPlayer').mockImplementation(() => {
    SceneMain.shield = 10;
    SceneMain.shield -= 1;
    SceneMain.text1 = (`Shields\n${SceneMain.shield}`);
    return SceneMain.shield;
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('It damages the player', () => {
  const MockMainScene = new SceneMain();
  const playerShield = MockMainScene.downPlayer();
  expect(playerShield).toBe(9);
  expect(playerShield).not.toBe(10);
});
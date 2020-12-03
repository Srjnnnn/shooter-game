import SceneMain from '../scenes/SceneMain';

jest.mock('../scenes/SceneMain.js');

beforeAll(() => {
  jest.spyOn(SceneMain.prototype, 'downEnemy').mockImplementation(() => {
    SceneMain.eShield = 10;
    SceneMain.eShield -= 1;
    SceneMain.text2 = (`Enemy shields\n${SceneMain.eShield}`);
    return SceneMain.eShield;
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('It damages the enemy', () => {
  const MockMainScene = new SceneMain();
  const EnemyShield = MockMainScene.downEnemy();
  expect(EnemyShield).toBe(9);
  expect(EnemyShield).not.toBe(10);
});
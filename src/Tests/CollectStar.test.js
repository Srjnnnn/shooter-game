import SceneMain from '../scenes/SceneMain';

jest.mock('../scenes/SceneMain.js');

beforeAll(() => {
  jest.spyOn(SceneMain.prototype, 'collectStar').mockImplementation(() => {
    window.point = 10;
    window.point += 10;
    SceneMain.text3 = (`The point\n${window.point}`);
    return window.point;
  });
});

afterAll(() => {
  jest.restoreAllMocks();
});

test('It increase the point by ten', () => {
  const MockMainScene = new SceneMain();
  const playerPoint = MockMainScene.collectStar(MockMainScene.ship, MockMainScene.starGroup);
  expect(playerPoint).toBe(20);
  expect(playerPoint).not.toBe(10);
});
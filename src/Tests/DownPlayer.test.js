import SceneMain from '../scenes/SceneMain';

beforeEach(() => {
  SceneMain.mockClear();
});

it('We can check if the consumer called the class constructor', () => {
  const ClassScene = new SceneMain();
  expect(ClassScene).toHaveBeenCalledTimes(1);
});

test('It damages the player', () => {
  const MockMainScene = SceneMain.mock.instances[0];
  MockMainScene.shield = 10;
  MockMainScene.damagePlayer();
  expect(MockMainScene.shield).toBe(9);
});
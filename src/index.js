import Phaser from 'phaser';

import SimpleScene from './scenes/simple-scene';
import SceneMainMenu from './scenes/SceneMainMenu';
import SceneGameOver from './scenes/SceneGameOver';

const gameConfig = {
  type: Phaser.WEBGL,
  width: 1000,
  height: 500,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  pixelArt: true,
  roundPixels: true,
  scene: [SimpleScene, SceneMainMenu, SceneGameOver],
};

export default new Phaser.Game(gameConfig);
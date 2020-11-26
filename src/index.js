import Phaser from 'phaser';

import SimpleScene from './scenes/simple-scene';

const gameConfig = {
  width: 1000,
  height: 500,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
        x: 0,
      },
      debug: false,
    },
  },
  scene: SimpleScene,
};

export default new Phaser.Game(gameConfig);
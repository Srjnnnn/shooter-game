import Phaser from 'phaser';
import SceneMain from './scenes/SceneMain';

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: 'phaser-game',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scene: [SceneMain],
  };
  window.game = new Phaser.Game(config);
};
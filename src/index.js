import Phaser from 'phaser';
import SceneMain from './scenes/SceneMain';
import Model from './Classes/Model';
import SceneIntro from './scenes/SceneIntro';
import SceneOver from './scenes/SceneOver';

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
    scene: [SceneIntro, SceneMain, SceneOver],
  };
  window.model = new Model();
  window.game = new Phaser.Game(config);
};
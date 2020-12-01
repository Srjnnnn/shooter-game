import Phaser from 'phaser';
import SceneMain from './scenes/SceneMain';
import Model from './Classes/Model';
import SceneIntro from './scenes/SceneIntro';
import SceneOver from './scenes/SceneOver';
import SceneLeaderBoard from './scenes/SceneLeaderBoard';

window.onload = () => {
  const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 600,
    dom: {
      createContainer: true,
    },
    parent: 'phaser-game',
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
      },
    },
    scene: [SceneIntro, SceneMain, SceneOver, SceneLeaderBoard],
  };
  window.model = new Model();
  window.game = new Phaser.Game(config);
};
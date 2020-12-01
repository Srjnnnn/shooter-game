import Phaser from 'phaser';
import Button from '../Objects/Button';

class SceneIntro extends Phaser.Scene {
  constructor() {
    super('SceneIntro');
  }

  preload() {
    this.load.image('play', 'assets/Play.png');
  }

  create() {
    this.btnStart = new Button(this, 400, 400, 'play', 'play', '', 'SceneMain');
    this.SoundButton = new Button(this, 200, 200, '', '', 'Toggle-Sound', 'SceneIntro');
  }
}

export default SceneIntro;
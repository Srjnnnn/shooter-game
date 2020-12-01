import Phaser from 'phaser';
import Button from '../Objects/Button';

class SceneIntro extends Phaser.Scene {
  constructor() {
    super('SceneIntro');
  }

  preload() {
    this.load.image('play', 'assets/Play.png');
    this.load.audio('mainTheme', 'assets/mainTheme.wav');
  }

  create() {
    this.btnStart = new Button(this, 200, 250, 'play', 'play', '', 'SceneMain');
    this.SoundButton = this.add.text(350, 50, 'Toggle-Sound').setInteractive();
    if (window.model.backgroundMusic === null && window.model.musicMode === true) {
      window.model.backgroundMusic = this.sound.add('mainTheme', { loop: true });
      window.model.backgroundMusic.play();
      window.model.musicMode = false;
    }
    this.SoundButton.on('pointerdown', () => this.toggler());
  }

  update() {
    
  }

  toggler() {
    if (window.model.musicMode) {
      window.model.backgroundMusic.stop();
      window.model.musicMode = false;
    } else {
      window.model.backgroundMusic.play();
      window.model.musicMode = true;
    }
  }
}

export default SceneIntro;
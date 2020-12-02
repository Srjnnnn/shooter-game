import Phaser from 'phaser';

class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preloadScene' });
  }

  preload() {
    this.load.image('play', 'assets/Play.png');
    this.load.audio('mainTheme', 'assets/mainTheme.wav');
    this.load.html('nameform', 'assets/loginform.html');
    this.loadingText = this.add.text(300, 260, 'Loading: ', { fontSize: '32px', fill: '#FFF' });
    this.load.on('complete', () => this.completeCall());
  }

  completeCall() {
    this.scene.start('SceneIntro');
  }
}

export default PreloadScene;
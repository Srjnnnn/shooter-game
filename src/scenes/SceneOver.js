import Phaser from 'phaser';
import Button from '../Objects/Button';

export default class SceneOver extends Phaser.Scene {
  constructor() {
    super('SceneOver');
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('Re-play', 'assets/Play.png');
  }

  create() {
    this.add.image(0, 0, 'background').setOrigin(0.5, 0.5);
    this.title = this.add.text(this.game.config.width / 2, 0, 'The game is over');
    if (window.playerWon === true) {
      this.explanation = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `You've won the game\n Your score is ${window.model.point}`);
      this.explanation2 = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, `Your time is: ${window.model.clock}`);
      this.TimeClearer();
    } else {
      this.explanation = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `You've lost the game\n Your score is ${window.model.point}`);
      this.explanation2 = this.add.text(this.game.config.width / 2, this.game.config.height / 2 + 50, `Your time is: ${window.model.clock}`);
      this.TimeClearer();
    }
    this.btnStart = new Button(this, 400, 400, 'Re-play', 'Re-play', '', 'SceneMain');
  }

  TimeClearer() {
    window.model.clock = 0;
  }
}
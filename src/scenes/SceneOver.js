import Phaser from 'phaser';
import SceneMain from './SceneMain';

export default class SceneOver extends Phaser.Scene {
  constructor() {
    super('SceneOver');
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
  }

  create() {
    const SceneVariable = new SceneMain();
    this.add.image(0, 0, 'background').setOrigin(0.5, 0.5);
    this.title = this.add.text(this.game.config.width / 2, 0, 'The game is over');
    if (SceneVariable.playerWon === true) {
      this.explanation = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `You've won the game\n Your score is ${window.model.point}`);
    } else {
      this.explanation = this.add.text(this.game.config.width / 2, this.game.config.height / 2, `You've lost the game\n Your score is ${window.model.point}`);
    }
    // const btnStart = new FlatButton({
    //   scene: this,
    //   key: 'button1',
    //   text: 'Play Again!',
    //   event: 'start_game',
    // });
    // this.alignGrid.placeAtIndex(93, btnStart);
    // emitter.on('start_game', this.startGame, this);

    // const sb = new SoundButtons({
    //   scene: this,
    // });
  }

  // startGame() {
  //   this.scene.start('SceneMain');
  // }

  // update() {}
}
import Phaser from 'phaser';
import Fetcher from '../Functions/Fetcher';

export default class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super('SceneLeaderBoard');
  }

  create() {
    let i = 0;
    (async () => {
      await Fetcher().forEach(element => {
        i += 40;
        this.add.text(240, i, element, { fontSize: '20px', fill: '#fff' });
      });
    })();
  }
}
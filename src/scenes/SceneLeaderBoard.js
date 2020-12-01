import Phaser from 'phaser';
import Fetcher from '../Functions/Fetcher';

export default class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super('SceneLeaderBoard');
  }

  create() {
    const fetched = Fetcher();
    let i = 0;
    (async () => {
      await fetched.then(response => response.forEach(element => {
        i += 40;
        this.add.text(30, i, `The user is ${element.user}, the score is ${element.score}!`, { fontSize: '20px', fill: '#fff' });
      }));
    })();
  }
}
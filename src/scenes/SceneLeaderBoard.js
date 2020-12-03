import Phaser from 'phaser';
import Fetcher from '../Functions/Fetcher';
import Button from '../Objects/Button';

export default class SceneLeaderBoard extends Phaser.Scene {
  constructor() {
    super('SceneLeaderBoard');
  }

  create() {
    const fetched2 = Fetcher();
    let i = 0;
    const array = [];
    (async () => {
      await fetched2.then(response => response.forEach(element => {
        array.push(element);
      }));
      const array2 = array.sort((a, b) => b.score - a.score).slice(0, 10);
      array2.forEach(elem => {
        i += 40;
        this.add.text(30, i, `The user is ${elem.user}, the score is ${elem.score}!`, { fontSize: '20px', fill: '#fff' });
      });
    })();
    this.btnStart = new Button(this, 500, this.game.config.height / 2 + 150, 'Re-play', 'Re-play', '', 'SceneIntro');
  }
}
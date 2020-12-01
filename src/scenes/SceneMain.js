import Phaser from 'phaser';
import GetTimer from '../Functions/GetTimer';
import GetDirFromAngle from '../Functions/GetDirFromAngle';
import ToDegres from '../Functions/ToDegres';

class SceneMain extends Phaser.Scene {
  constructor() {
    super('SceneMain');
  }

  preload() {
    this.load.image('background', 'assets/background.jpg');
    this.load.image('ship', 'assets/player.png');
    this.load.spritesheet('stars', 'assets/star.png', {
      frameWidth: 24, frameHeight: 22,
    });
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('enemy', 'assets/eship.png');
    this.load.image('enemyBullet', 'assets/ebullet.png');
    this.load.spritesheet('explosion', 'assets/exp.png', {
      frameWidth: 64, frameHeight: 64,
    });
    this.load.audio('laser', 'assets/sndLaser.wav');
    this.load.audio('explode', 'assets/explode.wav');
  }

  create() {
    this.centerX = window.game.config.width / 2;
    this.centerY = window.game.config.height / 2;
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.shield = 5;
    this.eShield = 1000;
    window.model.point = 0;
    this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
    this.ship.scale = 0.65;
    this.enemy = this.physics.add.image(this.centerX, 25, 'enemy');
    this.enemy.body.collideWorldBounds = true;
    this.ship.body.collideWorldBounds = true;
    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.background.setInteractive();
    this.background.on('pointerdown', this.backgroundClicked, this);
    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.ship, true);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.starGroup = this.physics.add.group({
      key: 'stars',
      frame: [0],
      frameQuantity: 50,
      bounceX: 1,
      bounceY: 1,
      angularVelocity: 1,
      collideWorldBounds: true,
    });
    this.starGroup.children.iterate((child) => {
      const xx = Math.floor(Math.random() * this.background.displayWidth);
      const yy = Math.floor(Math.random() * this.background.displayHeight);
      child.x = xx;
      child.y = yy;
    });
    this.physics.add.overlap(this.ship, this.starGroup, this.collectStar, null, this);
    this.makeInfo();

    const frameNames = this.anims.generateFrameNumbers('explosion');
    const f2 = frameNames.slice();
    f2.reverse();
    const f3 = f2.concat(frameNames);
    this.anims.create({
      key: 'boom',
      frames: f3,
      frameRate: 48,
      repeat: false,
    });

    this.setTimer();
    this.laser = this.sound.add('laser', { loop: false });
    this.explode = this.sound.add('explode', { loop: false });
  }

  downPlayer() {
    this.shield -= 1;
    this.text1.setText(`Shields\n${this.shield}`);
    if (this.shield === 0) {
      window.model.playerWon = false;
      this.clearTimer();
      this.explode.play();
      window.model.backgroundMusic.stop();
      this.scene.start('SceneOver');
    }
  }

  downEnemy() {
    this.eShield -= 1;
    this.text2.setText(`Enemy shields\n${this.eShield}`);
    if (this.eShield === 0) {
      this.enemy.destroy();
      this.explode.play();
    }
  }

  makeInfo() {
    window.clock = 0;
    this.text1 = this.add.text(50, 0, 'Shields\n5');
    this.text2 = this.add.text(300, 0, 'Enemy shields\n 1000');
    this.text3 = this.add.text(150, 0, 'The point\n 0');
    this.text4 = this.add.text(15, 100, `Time: ${this.i}`);

    this.text1.setScrollFactor(0);
    this.text2.setScrollFactor(0);
    this.text3.setScrollFactor(0);
    this.text4.setScrollFactor(0);
  }

  setTimer() {
    this.timerVar = setInterval(() => {
      this.text4.setText(`Time: ${window.model.clock += 1}`);
    }, 1000);
  }

  clearTimer() {
    clearInterval(this.timerVar);
  }


  makeBullet() {
    const dirObj = GetDirFromAngle(this.ship.angle);
    const bullet = this.physics.add.sprite(this.ship.x + dirObj.tx * 30, this.ship.y + dirObj.ty * 30, 'bullet');
    bullet.angle = this.ship.angle;
    bullet.body.setVelocity(dirObj.tx * 100, dirObj.ty * 100);
    this.physics.add.collider(bullet, this.enemy, this.damageEnemy, null, this);
  }

  damageEnemy(bullet) {
    const explosion = this.add.sprite(bullet.x, bullet.y, 'explosion');
    explosion.play('boom');
    bullet.destroy();
    this.downEnemy();
  }

  damagePlayer(bullet, ship) {
    const explosion = this.add.sprite(ship.x, ship.y, 'explosion');
    explosion.play('boom');
    bullet.destroy();
    this.downPlayer();
  }

  fireEnemy() {
    const elapsed = Math.abs(this.lastEbullet - GetTimer());
    if (elapsed < 500) {
      return;
    }
    if (this.enemy.body) {
      this.lastEbullet = GetTimer();
      const bullet = this.physics.add.sprite(this.enemy.x, this.enemy.y, 'enemyBullet');
      bullet.body.angularVelocity = 10;
      this.physics.moveTo(bullet, this.ship.x, this.ship.y, 50);
      this.physics.add.collider(bullet, this.ship, this.damagePlayer, null, this);
    }
  }

  backgroundClicked() {
    const tx = this.background.input.localX;
    const ty = this.background.input.localY;
    this.tx = tx;
    this.ty = ty;
    let angle = this.physics.moveTo(this.ship, tx, ty, 90);
    angle = ToDegres(angle);
    this.ship.angle = angle;
    if (this.enemy.body) {
      let angle2 = this.physics.moveTo(this.enemy, this.ship.x, this.ship.y, 70);
      angle2 = ToDegres(angle2);
      this.enemy.angle = angle2;
    }
  }

  collectStar(player, star) {
    star.disableBody(true, true);
    window.model.point += 1;
    this.text3.setText(`The point\n${window.model.point}`);
    if (window.model.point === 5) {
      window.model.playerWon = true;
      this.clearTimer();
      window.model.backgroundMusic.stop();
      this.scene.start('SceneOver');
    }
  }

  update() {
    const distX = Math.abs(this.ship.x - this.tx);
    const distY = Math.abs(this.ship.y - this.ty);
    if (distX < 10 && distY < 10) {
      this.ship.body.setVelocity(0, 0);
    }
    if (this.cursors.space.isDown) {
      this.makeBullet();
      this.laser.play();
    }
    const distX2 = Math.abs(this.ship.x - this.enemy.x);
    const distY2 = Math.abs(this.ship.y - this.enemy.y);
    if (distX2 < this.game.config.width / 5 && distY2 < this.game.config.height / 5) {
      this.fireEnemy();
    }
  }
}


export default SceneMain;
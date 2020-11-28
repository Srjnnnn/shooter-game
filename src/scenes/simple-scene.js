import Phaser from 'phaser';

const STAR_KEY = 'star';

class SimpleScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.cursors = undefined;
    this.player = undefined;
    this.enemy = undefined;
    this.stars = undefined;
    this.laser = undefined;
  }

  preload() {
    this.load.spritesheet('enemy0', 'assets/sprEnemy0.png', {
      frameWidth: 16, frameHeight: 16,
    });
    this.load.spritesheet(STAR_KEY, 'assets/star.png', {
      frameWidth: 24, frameHeight: 22,
    });
    this.load.spritesheet('player',
      'assets/sprPlayer.png',
      { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('playerLaser', 'assets/sprLaserPlayer.png', {
      frameWidth: 1, frameHeight: 8,
    });
  }

  create() {
    this.createPlayer();
    setInterval(() => {
      this.createStars();
    }, 15000);

    setInterval(() => {
      this.createEnemy();
    }, 2000);
    this.physics.add.collider(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.laser = this.add.group();
    this.laser.enableBody = true;
    this.laser = this.laser.createMultiple(30, 'playerLaser');
    this.laser = this.physics.add.sprite('playerLaser');
  }

  createEnemy() {
    this.enemy = this.physics.add.sprite(Math.floor(Math.random() * 900 + 1), 15, 'enemy0');
    this.enemy.setGravityY(50);
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
  }

  createStars() {
    this.stars = this.physics.add.sprite(Math.floor(Math.random() * 900 + 1),
      Math.floor(Math.random() * 400 + 1), STAR_KEY);
  }

  update() {
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }

    if (this.cursors.space.isDown) {
      this.laser.setGravityY(-160);
    }
  }
}

export default SimpleScene;
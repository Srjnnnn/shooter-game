import Phaser from 'phaser';

const STAR_KEY = 'star';

class SimpleScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.cursors = undefined;
    this.player = undefined;
  }

  preload() {
    this.load.image('enemy0', 'assets/sprEnemy0.png');
    this.load.image(STAR_KEY, 'assets/star.png');
    this.load.spritesheet('player',
      'assets/sprPlayer.png',
      { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    this.createPlayer();
    this.createStars();
    this.add.image(500, 25, 'enemy0');
    this.physics.add.collider(this.player);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'player');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);

    // this.anims.create({
    //   key: 'left',
    //   frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    //   frameRate: 10,
    //   repeat: -1,
    // });

    // this.anims.create({
    //   key: 'turn',
    //   frames: [{ key: 'player', frame: 4 }],
    //   frameRate: 20,
    // });

    // this.anims.create({
    //   key: 'right',
    //   frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
  }

  createStars() {
    const stars = this.physics.add.group({
      key: STAR_KEY,
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });

    stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    return stars;
  }

  update() {
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-160);

      // this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(160);

      // this.player.anims.play('down', true);
    } else if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
      this.player.setVelocityY(0);
    }
  }
}

export default SimpleScene;
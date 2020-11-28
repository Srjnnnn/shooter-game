import Phaser from 'phaser';

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
  }

  create() {
    this.centerX = window.game.config.width / 2;
    this.centerY = window.game.config.height / 2;
    this.background = this.add.image(0, 0, 'background');
    this.background.setOrigin(0, 0);
    this.ship = this.physics.add.sprite(this.centerX, this.centerY, 'ship');
    this.ship.scale = 0.65;
    this.physics.world.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.background.setInteractive();
    this.background.on('pointerdown', this.backgroundClicked, this);
    this.cameras.main.setBounds(0, 0, this.background.displayWidth, this.background.displayHeight);
    this.cameras.main.startFollow(this.ship, true);
    this.starGroup = this.physics.add.group({
      key: 'stars',
      frame: [0],
      frameQuantity: 20,
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
  }

  backgroundClicked() {
    const tx = this.background.input.localX;
    const ty = this.background.input.localY;
    this.tx = tx;
    this.ty = ty;
    let angle = this.physics.moveTo(this.ship, tx, ty, 120);
    angle = this.toDegrees(angle);
    this.ship.angle = angle;
  }

  toDegrees(angle) {
    return angle * (180 / Math.PI);
  }

  update() {
    const distX = Math.abs(this.ship.x - this.tx);
    const distY = Math.abs(this.ship.y - this.ty);
    if (distX < 10 && distY < 10) {
      this.ship.body.setVelocity(0, 0);
    }
  }
}

export default SceneMain;
var game = new Phaser.Game();

var keyW;
var keyA;
var keyS;
var keyD;
var keyE;
var keyShift;
var keySpace;

var keys;
var player;
var playerHP = 3;
var playerHPText;
var playerSP = 5;
var playerSPText;
var playerSpeed = 5;

var pickAttack;
var bossHP = 10;

var group;
var sprite;

game.preload = function () {

    this.load.image('titlecard', 'assets/UI/TitleCard.png');
    this.load.image('controls', 'assets/UI/Controls.png');
    this.load.image('play', 'assets/UI/play.png');
    this.load.image('volumeoff', 'assets/UI/VolumeOff.png');
    this.load.image('volumeon', 'assets/UI/VolumeOn.png');
    this.load.image('youdied', 'assets/UI/YouDied.png');
    this.load.image('again', 'assets/UI/Again.png');
    this.load.image('victory', 'assets/UI/Victory.png');
    
    this.load.image('floor', 'assets/Tiles/TiledFloor.png');
    this.load.image('wallv', 'assets/Tiles/WallV.png');
    this.load.image('wallp', 'assets/Tiles/WallP.png');
    this.load.image('wallh', 'assets/Tiles/WallH.png');
    this.load.image('furnaceinactive', 'assets/Tiles/Furnace.png');
    this.load.image('furnaceactive', 'assets/Tiles/Lit-Furnace-Spritesheet.png');
    this.load.image('leverstatic', 'assets/Tiles/LeverStatic.png');
    this.load.image('leverpulled', 'assets/Tiles/LeverPulled-Spritesheet.png');
    this.load.image('shortcutdoor', 'assets/Tiles/ShortcutDoor.png');
    this.load.image('bossdoor', 'assets/Tiles/BossDoor.png');
    
    this.load.spritesheet('player', 'assets/Player/Player-Final-Spritesheet.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    
    this.load.spritesheet('zombaloid', 'assets/Zombaloid/Zombaloid-Final-Spritesheet.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    
    this.load.spritesheet('warlock', 'assets/Warlock/Warlock-Spritesheet.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    
    this.load.spritesheet('demon', 'assets/Demon/Demon-Spritesheet.png', {
        frameWidth: 16,
        frameHeight: 16
    });
    
};
game.create = function () {
    
    this.timer = -2000;
    
    this.anims.create({
        key: 'zombaloididle',
        frames: this.anims.generateFrameNumbers('zombaloid', { start: 0, end: 0 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'zombaloideast',
        frames: this.anims.generateFrameNumbers('zombaloid', { start: 1, end: 4 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'zombaloidattack',
        frames: this.anims.generateFrameNumbers('zombaloid', { start: 5, end: 8 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'zombaloidwest',
        frames: this.anims.generateFrameNumbers('zombaloid', { start: 9, end: 12 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'warlockidle',
        frames: this.anims.generateFrameNumbers('warlock', { start: 0, end: 3 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'warlocknorth',
        frames: this.anims.generateFrameNumbers('warlock', { start: 4, end: 7 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'warlockattack',
        frames: this.anims.generateFrameNumbers('warlock', { start: 8, end: 11 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'warlocksouth',
        frames: this.anims.generateFrameNumbers('warlock', { start: 12, end: 15 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'demonidle',
        frames: this.anims.generateFrameNumbers('demon', { start: 0, end: 3 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'demonnorth',
        frames: this.anims.generateFrameNumbers('demon', { start: 4, end: 7 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'hammerattack',
        frames: this.anims.generateFrameNumbers('demon', { start: 8, end: 11 }),
        framerate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'demoneast',
        frames: this.anims.generateFrameNumbers('demon', { start: 12, end: 15 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'demonfireball',
        frames: this.anims.generateFrameNumbers('demon', { start: 16, end: 19 }),
        framerate: 10,
        repeat: 0
    });
    this.anims.create({
        key: 'demonwest',
        frames: this.anims.generateFrameNumbers('demon', { start: 20, end: 23 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'north',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'east',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'south',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'west',
        frames: this.anims.generateFrameNumbers('player', { start: 16, end: 19 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'blocking',
        frames: this.anims.generateFrameNumbers('player', { start: 20, end: 20 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'blocked',
        frames: this.anims.generateFrameNumbers('player', { start: 21, end: 24 }),
        framerate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'attacking',
        frames: this.anims.generateFrameNumbers('player', { start: 25, end: 28 }),
        framerate: 10,
        repeat: 0
    });
    
    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    keyShift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.floor = this.add.sprite(0, 0, 'floor');
    this.floor.setOrigin(0, 0);
    this.melee1 = this.add.sprite(163, 160, 'zombaloid');
    this.melee1.setOrigin(0, 0);
    this.melee2 = this.add.sprite(30, 213, 'zombaloid');
    this.melee2.setOrigin(0, 0);
    this.melee3 = this.add.sprite(454, 225, 'zombaloid');
    this.melee3.setOrigin(0, 0);
    this.ranged1 = this.add.sprite(160, 35, 'warlock');
    this.ranged1.setOrigin(0, 0);
    this.ranged2 = this.add.sprite(476, 97, 'warlock');
    this.ranged2.setOrigin(0, 0);
    this.ranged3 = this.add.sprite(338, 418, 'warlock');
    this.ranged3.setOrigin(0, 0);
    this.boss = this.add.sprite(175, 417, 'demon');
    this.boss.setOrigin(0, 0);
    this.player = this.add.sprite(200, 417, 'player');
    this.player.setOrigin(0, 0);
    this.victory = this.add.sprite(-1000, 300, 'victory');
        this.victory.setOrigin(0, 0);
    this.youdied = this.add.sprite(-1000, 300, 'youdied');
        this.youdied.setOrigin(0, 0);
    this.again = this.add.sprite(-1000, 300, 'again');
        this.again.setOrigin(0, 0);
    this.controls = this.add.sprite(10, 150, 'controls');
        this.controls.setOrigin(0, 0);
};


game.update = function update(time, delta) {
    this.timer += delta;
    while (this.timer >= 5000) {
        pickAttack = game.rnd.integerInRange(0, 10);
        this.timer -= 5000;
        this.again.setPosition(100,300);
    }
    if (keyShift.isDown) {
        this.player.anims.play('blocking', true);
        console.log('Player is blocking');
        if (pickAttack > 5) {
            this.player.anims.play('blocked', true);
            console.log('Player blocked a strike');
            this.victory.setPosition(100, 300);
        } else {
            playerHP -= 1;
            console.log('Player was scorched by a fireball');
            this.youdied.setPosition(100, 300);
        }
    } else if (keySpace.isDown) {
        this.player.anims.play('attacking', true);
        console.log('Player is attacking');
        if (pickAttack < 5) {
            console.log('Player parried a fireball');
            this.victory.setPosition(100, 300);
        } else {
            playerHP -= 1;
            console.log('Player was dented by a hammer');
            this.victory.setPosition(100, 300);
        }
    } else {
        this.player.anims.play('idle', true);
    }
    
    if (pickAttack > 5) {
        this.boss.anims.play('demonfireball', true);
    } else if (pickAttack < 5) {
        this.boss.anims.play('hammerattack', true);
    } else {
        this.boss.anims.play('demonidle', true);
    }
};

let config = {
    type: Phaser.AUTO,
    width: 656,
    height: 528,
    pixelArt: true,
    scene: game
};

var game = new Phaser.Game(config);
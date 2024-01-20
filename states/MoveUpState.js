export default class MoveUpState
{
	/** @type {Phaser.Physics.Arcade.Sprite} */
	player

	/**
	 * @param {Phaser.Physics.Arcade.Sprite} player 
	 */
	constructor(player)
	{
		this.player = player
	}

	enter()
	{
		this.player.play('north')

		const speed = 200
		this.player.setVelocity(0, -speed)
	}
}
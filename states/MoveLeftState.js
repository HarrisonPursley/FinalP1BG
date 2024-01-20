export default class MoveLeftState
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
		this.player.play('west')

		const speed = 200
		this.player.setVelocity(-speed, 0)
	}
}
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Show the leaderboard of the server')

module.exports = { data }
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('set_channel')
	.setDescription('Change leaderboard channel to the current channel')

module.exports = { data }
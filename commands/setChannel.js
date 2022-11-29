const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('set')
	.setDescription('Change leaderboard channel to the current channel')
	.addSubcommand((subcommand) =>
		subcommand
			.setName('channel')
			.setDescription('Change leaderboard channel to the current channel'))

module.exports = { data }
const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('stats')
	.setDescription('Get the latest stats of a summoner')
	.addStringOption(option =>
		option.setName('username')
			.setDescription('Summoner name')
			.setRequired(true))
	.addStringOption(option =>
		option.setName('queue')
			.setDescription('Enter the type of queue (solo/duo or flex)')
			.setRequired(true));

module.exports = { data }
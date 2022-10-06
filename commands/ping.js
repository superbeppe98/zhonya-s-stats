const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with pong!')

module.exports = { data }
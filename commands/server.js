const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('server')
	.setDescription('Replies with server info!')

module.exports = { data }
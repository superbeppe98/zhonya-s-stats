const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('pino')
	.setDescription('Replies with a secret phrase! *_*')

module.exports = { data }
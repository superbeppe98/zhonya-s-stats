const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
	.setName('streaks')
	.setDescription('Displays infographics about kill-streaks in recent games')
    .addStringOption(option =>
        option.setName('region')
            .setDescription('Region')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('summoner-name')
            .setDescription('Summoner name')
            .setRequired(true))
module.exports = { data }

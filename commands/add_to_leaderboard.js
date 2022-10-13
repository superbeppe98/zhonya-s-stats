const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('add_to_leaderboard')
    .setDescription('Add an user to the server leaderboard')
    .addStringOption(option =>
        option.setName('discord-username')
            .setDescription('Discord username')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('summoner-name')
            .setDescription('Summoner name')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('region')
            .setDescription('Enter the region you want to use (ex: EUW for Europe West)')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('queue')
            .setDescription('Enter the type of queue (solo/duo or flex)')
            .setRequired(true));

module.exports = { data }
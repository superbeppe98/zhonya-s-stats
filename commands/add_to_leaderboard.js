const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('add_to_leaderboard')
    .setDescription('Add an user to the server leaderboard')
    .addStringOption(option =>
        option.setName('username')
            .setDescription('Summoner name')
            .setRequired(true));

module.exports = { data }
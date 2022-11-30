const { SlashCommandBuilder } = require('@discordjs/builders');

const data = new SlashCommandBuilder()
    .setName('remove')
    .setDescription('Remove an user from the server leaderboard')
    .addSubcommandGroup((group) =>
        group
            .setName('from')
            .setDescription('Remove an user from the server leaderboard')
            .addSubcommand((subcommand) =>
                subcommand
                    .setName('leaderboard')
                    .setDescription('Remove an user from the server leaderboard')
                    .addStringOption(option =>
                        option.setName('username')
                            .setDescription('Summoner name')
                            .setRequired(true))))

module.exports = { data }
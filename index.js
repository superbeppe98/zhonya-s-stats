const fs = require('fs');
config = require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const router = require('./botFunctions/_mainRouter');
const leaderboard_refresh = require('./botFunctions/leaderboardRefresh');
require('./utilities');

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
    partials: [Partials.Channel],
}); client.login(process.env.DISCORD_TOKEN);

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    let commandName = interaction.commandName;
    let commandGroup = " " + interaction.options.getSubcommandGroup();
    let commandSubcommand = " " + interaction.options.getSubcommand();
    if (!interaction.options.getSubcommandGroup()) {
        commandGroup = '';
    }
    console.log(`Received command: ${commandName}${commandGroup}${commandSubcommand}`);
    router(config, interaction);
});

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'refresh') {
        leaderboard_refresh(config, interaction);
    }
});
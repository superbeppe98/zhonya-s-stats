const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { Client, GatewayIntentBits, Partials } = require("discord.js");
const router = require('./botFunctions/_mainRouter.js');
const refresh = require('./botFunctions/leaderboard_refresh.js');
require('./utilities.js');

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
    console.log(`Received command: ${interaction.commandName}`);
    router(config, interaction);
});

client.on('interactionCreate', interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'refresh') {
        refresh(interaction);
    }
});
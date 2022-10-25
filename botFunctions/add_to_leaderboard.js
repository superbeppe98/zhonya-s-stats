const db = require("../database.js");
const riot = require('../scrapper.js');
const utils = require('../utilities.js');

async function add_to_leaderboard(config, interaction) {
    var discordUsername = interaction.options.get('discord-username')?.value;
    var summonerName = interaction.options.get('summoner-name')?.value;
    var region = interaction.options.get('region')?.value;
    if (!utils.isValidRegion(region)) {
        interaction.reply(`${region} is not a valid region.`);
        return;
    }
    newRegion = utils.formatRegion(region);
    var queue = interaction.options.get('queue')?.value;

    if (await db.checkChannelSet(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    if (interaction.channel.id !== await db.getChannel(interaction.guild.id)) {
        interaction.reply('This command can only be used in the channel set by the bot.');
        return;
    }
    if (await db.userExist(interaction.guild.id, discordUsername) === true) {
        interaction.reply('This player is already in the leaderboard.');
        return;
    }
    if (await db.checkMaxUsers(interaction.guild.id) === true) {
        interaction.reply('The leaderboard is full.');
        return;
    }
    var soloDuostats = await riot.scrapper(newRegion, summonerName, "solo/duo");
    if (soloDuostats.exists === false) {
        interaction.reply('This player doesn\'t exist.');
        return;
    }
    db.addUser(interaction.guild.id, soloDuostats, "solo/duo");

    flexStats = await riot.scrapper(newRegion, summonerName, "flex");
    if (await db.userExist(interaction.guild.id, discordUsername) === true) {
        //todo check if the user is already in the leaderboard on flex or solo/duo
    } else {
        db.addUser(interaction.guild.id, flexStats, "flex");
    }
    await interaction.reply(`LoL account ${summonerName} of ${discordUsername} added to leaderboard.`);
}

module.exports = add_to_leaderboard;
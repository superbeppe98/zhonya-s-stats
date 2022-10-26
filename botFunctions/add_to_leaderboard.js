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
    if (await db.userExist(interaction.guild.id, summonerName) === true) {
        db.getStats(interaction.guild.id, summonerName).then((stats) => {
            var newStats = {
                SOLO_hotStreak: stats.SOLO_hotStreak,
                SOLO_leaguePoints: stats.SOLO_leaguePoints,
                SOLO_wins: stats.SOLO_wins,
                SOLO_losses: stats.SOLO_losses,
                SOLO_rank: stats.SOLO_rank,
                SOLO_winrate: stats.SOLO_winrate,
                FLEX_hotStreak: flexStats.hotStreak,
                FLEX_leaguePoints: flexStats.leaguePoints,
                FLEX_wins: flexStats.wins,
                FLEX_losses: flexStats.losses,
                FLEX_rank: flexStats.tier + ' ' + flexStats.rank,
                FLEX_winrate: flexStats.winrate
            }
            db.updateUser(interaction.guild.id, summonerName, newStats);
        });
    }
    await interaction.reply(`LoL account ${summonerName} of ${discordUsername} added to leaderboard.`);
}

module.exports = add_to_leaderboard;
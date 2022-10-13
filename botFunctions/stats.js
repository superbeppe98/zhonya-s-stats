const riot = require('../scrapper.js');
const reply = require('../reply.js');
const utils = require('../utilities.js');

async function stats(interaction) {
    var summonerName = interaction.options.get('summoner-name')?.value;
    var region = interaction.options.get('region')?.value;
    if (!utils.isValidRegion(region)) {
        interaction.reply(`${region} is not a valid region.`);
        return;
    }
    newRegion = utils.formatRegion(region);
    var queueArg = interaction.options.get('queue')?.value;
    if (queueArg.toLowerCase() == "solo/duo") {
        var stats = await riot.scrapper(newRegion, summonerName);
    }
    else if (queueArg.toLowerCase() == "flex") {
        var stats = await riot.scrapperFlex(newRegion, summonerName);
    }
    //console.log(stats);
    if (stats.exists === false) {
        interaction.reply('This player doesn\'t exist.');
        return;
    }
    var message = reply.summonerStat(newRegion, stats.summonerName,
        stats.profileIcon, stats.tier, stats.rank,
        stats.leaguePoints, stats.winrate, stats.wins,
        stats.losses, stats.opgg, stats.hotStreak);
    await interaction.reply({ embeds: [message] });
}

module.exports = stats;
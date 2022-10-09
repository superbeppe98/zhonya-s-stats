const riot = require('../scrapper.js');
const reply = require('../reply.js');

async function stats(config, interaction) {
    var usernameArg = interaction.options.get('username')?.value;
    var queueArg = interaction.options.get('queue')?.value;
    if (queueArg.toLowerCase() == "solo/duo") {
        var stats = await riot.scrapper(config.region, usernameArg);
    }
    else if (queueArg.toLowerCase() == "flex") {
        var stats = await riot.scrapperFlex(config.region, usernameArg);
    }
    //console.log(stats);
    if (stats.exists === false) {
        interaction.reply('This player doesn\'t exist.');
        return;
    }
    var message = reply.summonerStat(config.region, stats.summonerName,
        stats.profileIcon, stats.tier, stats.rank,
        stats.leaguePoints, stats.winrate, stats.wins,
        stats.losses, stats.opgg, stats.hotStreak);
    await interaction.reply({ embeds: [message] });
}

module.exports = stats;
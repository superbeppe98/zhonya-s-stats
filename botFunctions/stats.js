const riot = require('../scrapper.js');
const reply = require('../reply.js');

async function stats(config, interaction) {
    var usernameArg = interaction.options.get('username')?.value;
    var stats = await riot.scrapper(config.region, usernameArg);
    console.log(stats);
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
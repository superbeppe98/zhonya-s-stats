const db = require("../database.js");
const reply = require("../reply.js");

async function leaderboard(interaction) {
    if (await db.checkChannelSet(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    if (interaction.channel.id !== await db.getChannel(interaction.guild.id)) {
        interaction.reply('This command can only be used in the channel set by the bot.');
        return;
    }
    if (await db.checkHasUsers(interaction.guild.id) === false) {
        interaction.reply('The leaderboard is empty.');
        return;
    }
    let data = await db.getLeaderboard(interaction.guild.id);
    let { embed, row } = reply.leaderboardStat(interaction, data.users);
    await interaction.reply({ embeds: [embed], components: [row] });
}

module.exports = leaderboard;
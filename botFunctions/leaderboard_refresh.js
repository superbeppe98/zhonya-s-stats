const db = require("../database.js");
const reply = require("../reply.js");

async function leaderboard_refresh(interaction) {
    let data = await db.getLeaderboard(interaction.guild.id);
    let { embed, row } = reply.leaderboardStat(interaction, data.users);
    if (interaction.isMessageComponent) {
        await interaction.update({ embeds: [embed], components: [row] });
    }
}

module.exports = leaderboard_refresh;
const db = require("../database.js");
const riot = require('../scrapper.js');

async function add_to_leaderboard(config, interaction) {
    var usernameArg = interaction.options.get('username')?.value;
    if (await db.checkChannelSet(interaction.guild.id) === false) {
        interaction.reply('Please set a channel first.');
        return;
    }
    if (interaction.channel.id !== await db.getChannel(interaction.guild.id)) {
        interaction.reply('This command can only be used in the channel set by the bot.');
        return;
    }
    if (await db.userExist(interaction.guild.id, usernameArg) === true) {
        interaction.reply('This player is already in the leaderboard.');
        return;
    }
    if (await db.checkMaxUsers(interaction.guild.id) === true) {
        interaction.reply('The leaderboard is full.');
        return;
    }
    var stats = await riot.scrapper(config.region, usernameArg);
    if (stats.exists === false) {
        interaction.reply('This player doesn\'t exist.');
        return;
    }
    db.addUser(interaction.guild.id, stats);
    await interaction.reply(`${usernameArg} added to leaderboard.`);
}

module.exports = add_to_leaderboard;
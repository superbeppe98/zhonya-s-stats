const db = require("../database.js");

async function set_channel(interaction) {
    if (await db.checkSameChannel(interaction.guild.id, interaction.channel.id) === true) {
        await interaction.reply({ content: 'This channel is already set!', ephemeral: true });
        return;
    }
    let messages = await interaction.channel.messages.fetch({ limit: 100 });
    /*if (messages.size > 0) {
        interaction.reply("Channel must be empty.");
        return;
    }*/
    db.setChannel(interaction.guild.id, interaction.channel.id);
    await interaction.reply({ content: 'Channel set!', ephemeral: true });
}

module.exports = set_channel;
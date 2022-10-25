const addToLeaderBoard = require('./add_to_leaderboard');
const leaderboard = require('./leaderboard');
const pino = require('./pino');
const removeFromLeaderboard = require('./remove_from_leaderboard');
const setChannel = require('./set_channel');
const stats = require('./stats');

async function router(config, interaction) {
    if (interaction.commandName == 'add_to_leaderboard')
        addToLeaderBoard(config, interaction)
    else if (interaction.commandName == 'leaderboard')
        leaderboard(config, interaction)
    else if (interaction.commandName == 'pino')
        pino(config, interaction)
    else if (interaction.commandName == 'remove_from_leaderboard')
        removeFromLeaderboard(config, interaction)
    else if (interaction.commandName == 'set_channel')
        setChannel(interaction)
    else if (interaction.commandName == 'stats')
        stats(interaction)
}

module.exports = router;
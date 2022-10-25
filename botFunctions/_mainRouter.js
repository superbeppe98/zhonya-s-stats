const addToLeaderBoard = require('./add_to_leaderboard');
const leaderboard = require('./leaderboard');
const pino = require('./pino');
const removeFromLeaderboard = require('./remove_from_leaderboard');
const setChannel = require('./set_channel');
const stats = require('./stats');

async function router(interaction) {
    if (interaction.commandName == 'add_to_leaderboard')
        addToLeaderBoard(interaction)
    else if (interaction.commandName == 'leaderboard')
        leaderboard(interaction)
    else if (interaction.commandName == 'pino')
        pino(interaction)
    else if (interaction.commandName == 'remove_from_leaderboard')
        removeFromLeaderboard(interaction)
    else if (interaction.commandName == 'set_channel')
        setChannel(interaction)
    else if (interaction.commandName == 'stats')
        stats(interaction)
}

module.exports = router;
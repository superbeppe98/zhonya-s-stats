const addToLeaderBoard = require('./addToLeaderboard');
const leaderboard = require('./leaderboard');
const pino = require('./pino');
const removeFromLeaderboard = require('./removeFromLeaderboard');
const setChannel = require('./setChannel');
const stats = require('./stats');
const streaks = require('./streaks');

async function router(config, interaction) {
    if (interaction.commandName == 'add')
        addToLeaderBoard(config, interaction)
    else if (interaction.commandName == 'leaderboard')
        leaderboard(config, interaction)
    else if (interaction.commandName == 'pino')
        pino(config, interaction)
    else if (interaction.commandName == 'remove')
        removeFromLeaderboard(config, interaction)
    else if (interaction.commandName == 'set')
        setChannel(config, interaction)
    else if (interaction.commandName == 'stats')
        stats(config, interaction)
    else if (interaction.commandName == 'streaks')
        streaks(config, interaction)
}

module.exports = router;
const addToLeaderBoard = require('./add_to_leaderboard');
const leaderboard = require('./leaderboard');
const ping = require('./ping');
const pino = require('./pino');
const removeFromLeaderboard = require('./remove_from_leaderboard');
const server = require('./server');
const setChannel = require('./set_channel');
const setRegion = require('./set_region');
const stats = require('./stats');

async function router(config, interaction) {
    if (interaction.commandName == 'add_to_leaderboard')
        addToLeaderBoard(config, interaction);
    if (interaction.commandName == 'leaderboard')
        leaderboard(interaction);
    if (interaction.commandName == 'ping')
        ping(interaction);
    if (interaction.commandName == 'pino')
        pino(interaction);
    if (interaction.commandName == 'remove_from_leaderboard')
        removeFromLeaderboard(interaction);
    if (interaction.commandName == 'server')
        server(interaction);
    if (interaction.commandName == 'set_channel')
        setChannel(interaction);
    if (interaction.commandName == 'set_region')
        setRegion(config, interaction);
    if (interaction.commandName == 'stats')
        stats(config, interaction);
}

module.exports = router;
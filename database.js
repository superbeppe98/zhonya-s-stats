const mongoose = require('mongoose');

const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'Zhonya-s-Stats'
};
mongoose.connect(process.env.MONGO_URL, clientOptions);
var connection = mongoose.connection;
connection.on('connected', function () {
  console.log('Database is connected successfully');
});
connection.on('disconnected', function () {
  console.log('Database is disconnected successfully');
})
connection.on('error', console.error.bind(console, 'connection error:'));
module.exports = connection;

async function checkSameChannel(guild_id, channel_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return false;
  if (guild_data.channel_id === channel_id)
    return true;
  return false;
}

async function checkChannelSet(guild_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return false;
  return true
}

async function setChannel(guild_id, channel_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null) {
    var new_guild = {
      guild_id: guild_id,
      channel_id: channel_id
    };
    await mongo_ref.insertOne(new_guild);
  }
  else
    await mongo_ref.updateOne({ guild_id: guild_id }, { $set: { channel_id: channel_id } });
}

async function removeUser(guild_id, summoner_name) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return;
  await mongo_ref.updateOne({ guild_id: guild_id }, { $unset: { ["users." + summoner_name]: "" } });
}

async function userExist(guild_id, summoner_name) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return false;
  if (!guild_data.users)
    return false;
  if (!(summoner_name in guild_data.users))
    return false;
  return true;
}

async function getStats(guild_id, summoner_name) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return;
  return guild_data.users[summoner_name];
}

async function updateUser(guild_id, summoner_name, stats) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return;
  await mongo_ref.updateOne({ guild_id: guild_id }, { $set: { ["users." + summoner_name]: stats } });
}

async function addUser(guild_id, stats, queue) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  var formatted_stats = "";
  if (queue === "solo/duo") {
    formatted_stats = {
      SOLO_hotStreak: stats.hotStreak,
      SOLO_leaguePoints: stats.leaguePoints,
      SOLO_wins: stats.wins,
      SOLO_losses: stats.losses,
      SOLO_rank: stats.tier + ' ' + stats.rank,
      SOLO_winrate: stats.winrate
    }
  } else if (queue === "flex") {
    formatted_stats = {
      FLEX_hotStreak: stats.hotStreak,
      FLEX_leaguePoints: stats.leaguePoints,
      FLEX_wins: stats.wins,
      FLEX_losses: stats.losses,
      FLEX_rank: stats.tier + ' ' + stats.rank,
      FLEX_winrate: stats.winrate
    }
  }
  if (guild_data === null) {
    var new_guild = {
      guild_id: guild_id,
      users: { [stats.summonerName]: formatted_stats }
    };
    await mongo_ref.insertOne(new_guild);
  }
  else
    await mongo_ref.updateOne({ guild_id: guild_id }, { $set: { ["users." + stats.summonerName]: formatted_stats } });
}

async function checkHasUsers(guild_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return false;
  if (guild_data.users[0] === null)
    return false;
  return true;
}

async function checkMaxUsers(guild_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return false;
  if (!guild_data.users)
    return false;
  if (Object.keys(guild_data.users).length >= 9)
    return true;
  return false;
}

async function getLeaderboard(guild_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return;
  return guild_data;
}

async function getChannel(guild_id) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  if (guild_data === null)
    return;
  return guild_data.channel_id;
}

module.exports = {
  checkSameChannel, checkChannelSet, userExist, setChannel, getStats, updateUser, addUser,
  checkHasUsers, checkMaxUsers, removeUser, getLeaderboard, getChannel
};
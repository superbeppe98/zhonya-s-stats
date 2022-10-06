const mongoose = require('mongoose');

const clientOptions = {
  useNewUrlParser: true,
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

async function addUser(guild_id, stats) {
  var mongo_ref = connection.db.collection('Zhonya-s-Stats');
  var guild_data = await mongo_ref.findOne({ guild_id: guild_id });
  let formatted_stats = {
    hotStreak: stats.hotStreak,
    leaguePoints: stats.leaguePoints,
    losses: stats.losses,
    rank: stats.tier + ' ' + stats.rank,
    winrate: stats.winrate,
    wins: stats.wins
  };
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
  console.log(guild_data);
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
  checkSameChannel, checkChannelSet, userExist, setChannel, addUser,
  checkHasUsers, checkMaxUsers, removeUser, getLeaderboard, getChannel
};
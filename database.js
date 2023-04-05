const mongoose = require('mongoose');

const clientOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  strictQuery: true,
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

async function checkSameChannel(guildId, channelId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return false;
  if (guildData.channelId === channelId)
    return true;
  return false;
}

async function checkChannelSet(guildId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return false;
  return true
}

async function setChannel(guildId, channelId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null) {
    var newGuild = {
      guildId: guildId,
      channelId: channelId
    };
    await mongoRef.insertOne(newGuild);
  }
  else
    await mongoRef.updateOne({ guildId: guildId }, { $set: { channelId: channelId } });
}

async function removeUser(guildId, summonerName) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return;
  await mongoRef.updateOne({ guildId: guildId }, { $unset: { ["users." + summonerName]: "" } });
}

async function userExist(guildId, summonerName) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return false;
  if (!guildData.users)
    return false;
  if (!(summonerName in guildData.users))
    return false;
  return true;
}

async function getStats(guildId, summonerName) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return;
  return guildData.users[summonerName];
}

async function updateUser(guildId, summonerName, stats) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return;
  await mongoRef.updateOne({ guildId: guildId }, { $set: { ["users." + summonerName]: stats } });
}

async function addUser(guildId, stats, queue) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
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
  if (guildData === null) {
    var newGuild = {
      guildId: guildId,
      users: { [stats.summonerName]: formatted_stats }
    };
    await mongoRef.insertOne(newGuild);
  }
  else
    await mongoRef.updateOne({ guildId: guildId }, { $set: { ["users." + stats.summonerName]: formatted_stats } });
}

async function checkHasUsers(guildId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return false;
  if (guildData.users[0] === null)
    return false;
  return true;
}

async function checkMaxUsers(guildId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return false;
  if (!guildData.users)
    return false;
  if (Object.keys(guildData.users).length >= 9)
    return true;
  return false;
}

async function getLeaderboard(guildId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return;
  return guildData;
}

async function getChannel(guildId) {
  var mongoRef = connection.db.collection('Zhonya-s-Stats');
  var guildData = await mongoRef.findOne({ guildId: guildId });
  if (guildData === null)
    return;
  return guildData.channelId;
}

module.exports = {
  checkSameChannel, checkChannelSet, userExist, setChannel, getStats, updateUser, addUser,
  checkHasUsers, checkMaxUsers, removeUser, getLeaderboard, getChannel
};
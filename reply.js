const { ButtonStyle, ButtonBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const utils = require("./utilities.js");

function summonerStat(
  region,
  summonerName,
  profileIcon,
  tier,
  rank,
  leaguePoints,
  winrate,
  wins,
  losses,
  opgg,
  hotStreak
) {
  const message = {
    color: 0xd48f16,
    title: `Stats of ${summonerName} ${hotStreak === "true" ? "🔥" : " "}`,
    url: opgg,
    author: {
      name: summonerName,
      icon_url: profileIcon,
      url: opgg,
    },
    description: `This player have ${wins} wins and ${losses} losses in the current season.`,
    thumbnail: {
      url: `https://github.com/SuperBeppe98/Zhonya-s-Stats/raw/main/ranks/${tier}.png`,
    },
    fields: [
      {
        name: "Rank",
        value: `${tier} ${rank !== "0" ? rank : " "}`,
        inline: true,
      },
      {
        name: "LP",
        value: leaguePoints,
        inline: true,
      },
      {
        name: "Winrate",
        value: `${winrate}%`,
        inline: true,
      },
    ],
    footer: {
      text: `Server region: ${region}`,
    },
  };
  return message;
}

function leaderboardStat(interaction, users) {
  var longest_summonerName = 0, longest_rank = 0
  for (var key in users) {
    if (key.length > longest_summonerName)
      longest_summonerName = key.length
    if (users[key].rank.length > longest_rank)
      longest_rank = users[key].rank.length
  }
  title0 = 'Rank';
  title1 = 'Summoner';
  title2 = 'Tier';
  title3 = 'LP';
  title4 = 'Winrate';
  title = '`' + title0 + '  ' + title1 + ' '.repeat(longest_summonerName - title1.length + 3) +
    title2 + ' '.repeat(longest_rank - title2.length + 2) + title3 + '  ' + title4 + '`';
  const embed = new EmbedBuilder()
    .setTitle(`Leaderboard of ${interaction.guild.name}`)
    .setDescription(' ')
    .setColor(0xd48f16)
    .setTimestamp();
  i = 1;
  let res = '';
  users = utils.sortRank(users);
  // console.log(users);
  for (var key in users) {
    users[key].winrate += '%';
    let rank, percentage, hotStreak;
    if (i === 1) rank = '🥇';
    else if (i === 2) rank = '🥈';
    else if (i === 3) rank = '🥉';
    else rank = i + ' ';
    if (users[key].winrate.length < 5) percentage = users[key].winrate + (' '.repeat(6 - users[key].winrate.length));
    else percentage = users[key].winrate;
    if (users[key].rank === 'Unranked 0') users[key].rank = 'Unranked';
    if (users[key].leaguePoints.length < 2) users[key].leaguePoints += ' ';
    if (users[key].hotStreak === ('true' || true)) hotStreak = '🔥';
    else hotStreak = ' ';
    let line = ('`' + rank + ' '.repeat(4 + (i >= 10 ? 1 : 0)) + key + ' '.repeat(longest_summonerName - key.length + 3) + users[key].rank + ' '.repeat(longest_rank - users[key].rank.length + 2) + users[key].leaguePoints + '  ' + percentage + '`' + ' ' + hotStreak + '\n');
    res += (line);
    i++;
  }
  //console.log(res);
  embed.addFields({ name: title, value: res });
  //embed.addFields(title, res, false);
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("refresh")
      .setLabel("Refresh")
      .setStyle(ButtonStyle.Primary)
  );
  return { embed, row };
}

module.exports = { summonerStat, leaderboardStat };

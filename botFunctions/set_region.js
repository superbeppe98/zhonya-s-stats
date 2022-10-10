const utils = require('../utilities.js');

async function region(config, interaction) {
  var regionArg = interaction.options.get('region')?.value;
  if (!utils.isValidRegion(regionArg)) {
    interaction.reply(`${regionArg} is not a valid region.`);
    return;
  }
  newRegion = utils.formatRegion(regionArg);


  db.setRegion(interaction.guild.id, newRegion);

  await interaction.reply(`New region set to ${regionArg}.`);
}

module.exports = region;
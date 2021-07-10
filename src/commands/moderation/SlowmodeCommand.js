const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SlowmodeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'moderation', []);
  }

  async run(client, message, args) {

    const dEmbed = new Discord.MessageEmbed()
      .setDescription('You do not have permission to use this command.')
      .setColor("#fc0303")
      .setTimestamp();

    const sEmbed = new Discord.MessageEmbed()
      .setDescription('I require \`MANAGE CHANNELS\` permission to set slowmode.')
      .setColor("#fc0303")
      .setTimestamp();

    const aEmbed = new Discord.MessageEmbed()
      .setDescription('You need to state a number in which how long you would like the slowmode to be set to.')
      .setColor("#fc0303")
      .setTimestamp();

    const fEmbed = new Discord.MessageEmbed()
      .setDescription('You need to state a number between 0 and 21600, which represents the second the slowmode will be.')
      .setColor("#fc0303")
      .setTimestamp();

    const gEmbed = new Discord.MessageEmbed()
      .setDescription(`The slowmode for ${message.channel} is set.`)
      .setColor("#fc0303")
      .setTimestamp();

    const bEmbed = new Discord.MessageEmbed()
      .setDescription('Something went wrong setting the slowmode')
      .setColor("#fc0303")
      .setTimestamp();

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(dEmbed)
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(sEmbed);

    //.slowmode 100

    const value = Number(args[0]);

    if (!args[0]) return message.channel.send(aEmbed)
    if (!value || value < 0 || value > 21600) return message.channel.send(fEmbed);
    try {
      await message.channel.setRateLimitPerUser(value);
      message.channel.send(gEmbed);
    } catch (err) {
      console.log(err);
      message.channel.send(bEmbed);
    }
  }
}
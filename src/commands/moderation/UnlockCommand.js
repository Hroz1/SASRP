const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'moderation', []);
  }

 async run(client, message, args) {
  if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(xreasonEmbed)
  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(zreasonEmbed);
  
   const xreasonEmbed = new Discord.MessageEmbed()
      .setTitle('You do not have permission to use this command.')
      .setColor("#ffffff")
      .setTimestamp();

   const zreasonEmbed = new Discord.MessageEmbed()
      .setTitle('I require \`MANAGE CHANNELS\` permission to unlock.')
      .setColor("#ffffff")
      .setTimestamp();

   const vreasonEmbed = new Discord.MessageEmbed()
      .setTitle('I have unlocked the channel :unlock:')
      .setColor("#ffffff")
      .setTimestamp();

  const role = message.guild.roles.cache.get('861256775159513148');
  let lockChannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
  if (!lockChannel) lockChannel = message.channel;

  await lockChannel.updateOverwrite(role, {
    SEND_MESSAGES: true
  }).catch(err => console.log(err));
  message.channel.send(vreasonEmbed);
 }
}
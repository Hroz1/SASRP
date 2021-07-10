const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class RoleCommand extends BaseCommand {
  constructor() {
    super('sender', 'Message', []);
  }

  async run(client, message, args) {

    //.role @member 
    if (!message.member.hasPermission("CREATE_INVITE")) return message.channel.send('You do not have permission to use this command.');
    if (!message.guild.me.hasPermission("ADMINISTRATOR")) return message.channel.send('I require \`MANAGE ROLES\`permission to recruit.')

    const senderEmbed = new Discord.MessageEmbed()
      .setTitle("__Verify__")
      .setDescription(`Do \`.Verify\` to verify and get access to our server..`)
      .setColor("#03fc0b")
      .setTimestamp();
      
  message.channel.send(senderEmbed);
  }
}
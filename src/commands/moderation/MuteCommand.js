
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', []);
  }

  async run(client, message, args) {
    const gEmbed = new Discord.MessageEmbed()
      .setDescription('You do not have permission to use this command')
      .setColor("#73fc03")
      .setTimestamp();
    
    const qEmbed = new Discord.MessageEmbed()
      .setDescription('.Mute @Member Reason.')
      .setColor("#73fc03")
      .setTimestamp();

    const wEmbed = new Discord.MessageEmbed()
      .setDescription('The member mentioned is not in the server or something went wrong.')
      .setColor("#73fc03")
      .setTimestamp();

    const eEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot mute yourself.')
      .setColor("#73fc03")
      .setTimestamp();

    const rEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot mute the master.')
      .setColor("#73fc03")
      .setTimestamp();

    const tEmbed = new Discord.MessageEmbed()
      .setDescription('No reason given.')
      .setColor("#73fc03")
      .setTimestamp();

    const yEmbed = new Discord.MessageEmbed()
      .setDescription('This member is already muted.')
      .setColor("#73fc03")
      .setTimestamp();

    const uEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot mute someone with the same role as you or higher')
      .setColor("#73fc03")
      .setTimestamp();

    const iEmbed = new Discord.MessageEmbed()
      .setDescription('There was an issue giving the mute role')
      .setColor("#73fc03")
      .setTimestamp();

    const lEmbed = new Discord.MessageEmbed()
      .setDescription('Member has been Muted')
      .setColor("#73fc03")
      .setTimestamp();

    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(gEmbed);
    if (!message.guild.me.hasPermission("MUTE_MEMBERS")) return message.channel.send('I require \`MUTE_MEMBERS\` permission to mute');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('863192457936240640');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const muteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been Muted in ${message.guild.name}`)
      .setDescription(`Reason for being muted: ${reason}`)
      .setColor("#5708ab")
      .setTimestamp();

    if (!args[0]) return message.channel.send(qEmbed);
    if (!mentionedMember) return message.channel.send(wEmbed);
    if (mentionedMember.user.id == message.author.id) return message.channel.send(eEmbed);
    if (mentionedMember.user.id == client.user.id) return message.channel.send(rEmbed);
    if (!reason) reason = tEmbed ;
    if (mentionedMember.roles.cache.has(muteRole.id)) return message.channel.send(yEmbed);
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send(uEmbed);

    await mentionedMember.send(muteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.add(muteRole.id).catch(err => console.log(err).then(message.channel.send(iEmbed)));

    message.channel.send(lEmbed)
 
  }
}
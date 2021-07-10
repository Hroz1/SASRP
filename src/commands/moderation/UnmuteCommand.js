
const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'moderation', []);
  }

  async run(client, message, args) {
    if (!message.member.hasPermission("MUTEE_MEMBERS")) return message.channel.send('You do not have permission to use this command');
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send('I require \`MANAGE_ROLES\` permission to mute');

    let reason = args.slice(1).join(" ");
    const muteRole = message.guild.roles.cache.get('861738949071339561');
    const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    const unmuteEmbed = new Discord.MessageEmbed()
      .setTitle(`You have been UnMuted in ${message.guild.name}`)
      .setDescription(`Reason for being unmuted: ${reason}`)
      .setColor("#34ebe1")
      .setTimestamp();

    const eEmbed = new Discord.MessageEmbed()
      .setDescription('Unmute @Member Reason')
      .setColor("#34ebe1")
      .setTimestamp();

    const gEmbed = new Discord.MessageEmbed()
      .setDescription('The member mentioned is not in the server or something went wrong.')
      .setColor("#34ebe1")
      .setTimestamp();

    const lEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot unmute yourself.')
      .setColor("#34ebe1")
      .setTimestamp();

    const uEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot unmute the master.')
      .setColor("#34ebe1")
      .setTimestamp();

    const iEmbed = new Discord.MessageEmbed()
      .setDescription('No reason given.')
      .setColor("#34ebe1")
      .setTimestamp();

    const tEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot unmute someone with the same role as you or higher')
      .setColor("#34ebe1")
      .setTimestamp();

    const qEmbed = new Discord.MessageEmbed()
      .setDescription('There was an issue removing the member role')
      .setColor("#34ebe1")
      .setTimestamp();

    const mEmbed = new Discord.MessageEmbed()
      .setDescription('Member has been Unmuted')
      .setColor("#34ebe1")
      .setTimestamp();

    if (!args[0]) return message.channel.send(eEmbed);
    if (!mentionedMember) return message.channel.send(gEmbed);
    if (mentionedMember.user.id == message.author.id) return message.channel.send(lEmbed);
    if (mentionedMember.user.id == client.user.id) return message.channel.send(uEmbed);
    if (!reason) reason = iEmbed ;
    if (message.member.roles.highest.position <= mentionedMember.roles.highest.position) return message.channel.send(tEmbed);

    await mentionedMember.send(unmuteEmbed).catch(err => console.log(err));
    await mentionedMember.roles.remove(muteRole.id).catch(err => console.log(err).then(message.channel.send(qEmbed)));

    message.channel.send(mEmbed)
  }
}
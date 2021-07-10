const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class KickCommand extends BaseCommand {
  constructor() {
    super('kick', 'moderation', []);
  }

  async run(client, message, args) {

     const oEmbed = new Discord.MessageEmbed()
      .setDescription("You cannot use this command.")
      .setColor("#f09d05")
      .setTimestamp();

     const qEmbed = new Discord.MessageEmbed()
      .setDescription("No reason given")
      .setColor("#f09d05")
      .setTimestamp();

      const creasonEmbed = new Discord.MessageEmbed()
      .setDescription("You need to mention a user to kick. \`.kick @user reason\`")
      .setColor("#f09d05")
      .setTimestamp();

    const freasonEmbed = new Discord.MessageEmbed()
      .setDescription("The member mentioned is not in the server or something went wrong.")
      .setColor("#f09d05")
      .setTimestamp();

    const kreasonEmbed = new Discord.MessageEmbed()
      .setDescription('I cannot kick that member')
      .setColor("#f09d05")
      .setTimestamp();

    const nreasonEmbed = new Discord.MessageEmbed()
      .setDescription("I was unable to kick the member mentioned.")
      .setColor("#f09d05")
      .setTimestamp();

      const donereasoEmbed = new Discord.MessageEmbed()
      .setDescription("Member kicked.")
      .setColor("#f09d05")
      .setTimestamp();

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(oEmbed);
    const mentionedMember = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if (!reason) reason = qEmbed ;
    const kickEmbed = new Discord.MessageEmbed()
    .setTitle(`You were kicked from ${message.guild.name}`)
    .setDescription(`Reason: ${reason}`)
    .setColor("#f09d05")
    .setTimestamp()
    .setFooter(client.user.tag, client.user.displayAvatarURL());

    // .kick @user dm ad

    if (!args[0]) return message.channel.send(creasonEmbed)
    if (!mentionedMember) return message.channel.send(freasonEmbed)
    if (!mentionedMember.kickable) return message.channel.send(kreasonEmbed);
    try {
      await mentionedMember.send(kickEmbed);
    } catch (err) {
      console.log(`I was unable to message the member.`)
    }

    try {
      await mentionedMember.kick(reason);
    } catch (err) {
        console.log(err);
        message.channel,send(nreasonEmbed);
    }
    message.channel.send(donereasoEmbed)
  }
}
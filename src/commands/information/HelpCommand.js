const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class BanCommand extends BaseCommand {
  constructor() {
    super('help', 'information', []);
  }

  async run(client, message, args) {
    const sectionEmbed = new Discord.MessageEmbed()
      .setTitle('**__Bot Help Sections__**')
      .setColor("#ffffff")
      .setDescription('Use .help sectionName to access another section.')
      .addField('.Help Information', 'Information.')
      .addField('.Help Staff', 'Commands for Staff Members to use.')
      .addField('.Help Verify', 'Helps to verify yourself.')
      .addField('.Help Fun', 'Will lists the commands you can use to have fun with.')
      .setFooter(client.user.tag, client.user.displayAvatarURL());

    const infoEmbed = new Discord.MessageEmbed()
      .setTitle('**__Information Commands__**')
      .setColor("#ffffff")
      .addField('.Help Commands', 'This will list all commands there is.');

    const funEmbed = new Discord.MessageEmbed()
      .setTitle('**__Fun Commands__**')
      .setColor("#ffffff")
      .addField('.Avatar', 'Shows users Avatar.')
      .addField('.Meme', 'Sends a meme.')
      .addField('.Say', 'Makes a bot repeat your message.')
      .addField('.Snipe', 'Returns last deleted message within the channel.');

    const staffEmbed = new Discord.MessageEmbed()  
      .setTitle('**__Moderation Commands__**')
      .setColor("#ffffff")
      .addField('.Ban', 'Bans a member from the server.')
      .addField('.Unban', 'Unbans a member from the server.')
      .addField('.Kick', 'Kicks a member from the server.')
      .addField('.Mute', 'Mutes member.')
      .addField('.Unmute', 'Unmutes the member from the server.')
      .addField('.Lock', 'Locks channel.')
      .addField('.Unlock', 'Unlocks the channel which is locked.')
      .addField('.Slowmode', 'Sets a slowmode for the channel')
      .addField('.Purge', 'Deletes amount of messages thats stated.')
      .addField('.Nuke', 'Deletes the channel and duplicates it.');

    const verifyEmbed = new Discord.MessageEmbed()
      .setTitle('**__Verify Command__**')
      .setColor("#ffffff")
      .addField('.Verify', 'Verifies user and gives access to the server.')

    if (!args[0]) return message.channel.send(sectionEmbed);
    if (args[0] == 'information') return message.channel.send(infoEmbed);
    else if (args[0] == 'fun') return message.channel.send(funEmbed);
    else if (args[0] == 'verify') return message.channel.send(verifyEmbed);
    else if (args[0] == 'staff') return message.channel.send(staffEmbed);
  }
}
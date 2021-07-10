const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NukeCommand extends BaseCommand {
  constructor() {
    super('nuke', 'moderation', []);
  }

  async run(client, message, args) {

    const eEmbed = new Discord.MessageEmbed()
      .setDescription('You cannot use this command.')
      .setColor("#73fc03")
      .setTimestamp();

    const lEmbed = new Discord.MessageEmbed()
      .setDescription("No reason given.")
      .setColor("#73fc03")
      .setTimestamp();

    const oEmbed = new Discord.MessageEmbed()
      .setDescription("This channel is not deletable.")
      .setColor("#73fc03")
      .setTimestamp();

    
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(eEmbed)
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send('I require \`MANAGE CHANNELS\` permission to nuke.');
  
    let reason = args.join(" ") 
    const nukeChannel = message.channel;
  
    if (!reason) reason = lEmbed ;
    if (!nukeChannel.deletable) return message.channel.send(oEmbed);

    await nukeChannel.clone().catch(err => console.log(err));
    await nukeChannel.delete(reason).catch(err => console.log(err));

 }
}
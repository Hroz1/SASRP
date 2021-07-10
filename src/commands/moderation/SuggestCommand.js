const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class SocialCommand extends BaseCommand {
    constructor() {
      super('suggest', 'moderation', []);
    }
  
    async run(client, message, args) {

      const tEmbed = new Discord.MessageEmbed()
        .setDescription('You must state something to suggest')
        .setColor("#22ff05")
        .setTimestamp();
      
      let suggestion = args.join(' ');
      if (!args[0]) return message.channel.send(tEmbed)

      const mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      const suggestEmbed = new Discord.MessageEmbed()
        .setTitle("__Suggestion__")
        .addField(`**Suggestion:** ${suggestion}`, `This was suggested by ${message.author.tag}.`)
        .setColor("#22ff05")
        .setTimestamp();

      const iEmbed = new Discord.MessageEmbed()
        .setDescription('Suggestion Made.')
        .setColor("#22ff05")
        .setTimestamp();
      
      const channel = await message.guild.channels.cache.get("863121471860375613");
      channel.send(suggestEmbed).then(sentMessage => sentMessage.react('👍')).then(reaction => reaction.message.react('👎'));

      message.channel.send(iEmbed)
 }
}
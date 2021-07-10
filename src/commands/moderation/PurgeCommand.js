const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class PurgeCommand extends BaseCommand {
  constructor() {
    super('purge', 'moderation', []);
  }

  async run(client, message, args) {

    const xEmbed = new Discord.MessageEmbed()
       .setDescription('You cannot use this command')
       .setColor("#48f542")
       .setTimestamp();
    
    const zEmbed = new Discord.MessageEmbed()
       .setDescription("You must state a number of message to purge. \`.purge number\`")
       .setColor("#48f542")
       .setTimestamp();

    const cEmbed = new Discord.MessageEmbed()
       .setDescription("Number stated is not a valid number.")
       .setColor("#48f542")
       .setTimestamp();

    const vEmbed = new Discord.MessageEmbed()
       .setDescription("Number stated must be a whole number.")
       .setColor("#48f542")
       .setTimestamp();

    const yEmbed = new Discord.MessageEmbed()
       .setDescription('The number stated must be betweem 2 and 100')
       .setColor("#48f542")
       .setTimestamp();

    const uEmbed = new Discord.MessageEmbed()
       .setDescription(`Deleted messages!`)
       .setColor("#48f542")
       .setTimestamp();
   
    const iEmbed = new Discord.MessageEmbed()
       .setDescription('I was unable to delte the amount stated, make sure they are withing 14 days old.')
       .setColor("#48f542")
       .setTimestamp();

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(xEmbed);
    if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send("I do not have \`MANAGE_MESSAGES\` permission.");
    if (!args[0]) return message.channel.send(zEmbed);
    const amountToDelete = Number(args[0], 10);

    if (isNaN(amountToDelete)) return message.channel.send(cEmbed);
    if (!Number.isInteger(amountToDelete)) return message.channel.send(vEmbed);
    if (!amountToDelete || amountToDelete < 2 || amountToDelete > 100) return message.channel.send(yEmbed);
    const fetched = await message.channel.messages.fetch({
      limit: amountToDelete
    });

    try {
      await message.channel.bulkDelete(fetched)
        .then(messages => message.channel.send(uEmbed))
    } catch (err) {
      console.log(err);
      message.channel.send(iEmbed);
    }
  }
}
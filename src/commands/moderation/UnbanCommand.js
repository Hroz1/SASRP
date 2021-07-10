const BaseCommand = require('../../utils/structures/BaseCommand');
const Discord = require('discord.js');

module.exports = class UnbanCommand extends BaseCommand {
  constructor() {
    super('unban', 'moderation', []);
  }

  async run(client, message, args) {
    //Permission Checking:

    const zEmbed = new Discord.MessageEmbed()
       .setDescription('No reason given.')
       .setColor("#48f542")
       .setTimestamp();
       
    const xEmbed = new Discord.MessageEmbed()
       .setDescription('You must mention someone to unban. \`.unban ID reason\`')
       .setColor("#48f542")
       .setTimestamp();

    const wEmbed = new Discord.MessageEmbed()
       .setDescription('The ID stated is not a number. \`.unban ID reason\`')
       .setColor("#48f542")
       .setTimestamp();

    const eEmbed = new Discord.MessageEmbed()
       .setDescription("You do not have permission to ban someone.")
       .setColor("#48f542")
       .setTimestamp();
       
    const unbanEmbed = new Discord.MessageEmbed()
       .setDescription(`${args[0]} has been unbanned.`)
       .setColor("#48f542")
       .setTimestamp();

    const bEmbed = new Discord.MessageEmbed()
       .setDescription('This server does not have anyone banned')
       .setColor("#48f542")
       .setTimestamp();
    
    const aEmbed = new Discord.MessageEmbed()
       .setDescription('The user ID stated is not banned')
       .setColor("#48f542")
       .setTimestamp();

    const nEmbed = new Discord.MessageEmbed()
       .setDescription('Something went wrong unbanning the ID')
       .setColor("#48f542")
       .setTimestamp();

    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(wEmbed);
    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("My role does not have the ban permission.");

    //Variables:
    let reason = args.slice(1).join(" ");
    let userID = args[0];

    //Input Checking:
    if (!reason) reason = zEmbed ;
    if (!args[0]) return message.channel.send(xEmbed);
    if (isNaN(args[0])) return message.channel.send(wEmbed);

    //Executing:
    message.guild.fetchBans().then(async bans => {
      if (bans.size == 0) return message.channel.send(bEmbed);
      let bUser = bans.find(b => b.user.id == userID);
      if (!bUser) return message.channel.send(aEmbed);
      await message.guild.members.unban(bUser.user, reason).catch(err => {
        console.log(err);
        return message.channel.send(nEmbed);
      }).then(() => {
        message.channel.send(unbanEmbed);
      });
    });
  }
}
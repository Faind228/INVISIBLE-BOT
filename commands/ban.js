const Discord = require("discord.js")
exports.run = async (client, message, args) => {
  let modLog = message.guild.channels.find('name', client.settings.get(message.guild.id).modLogChannel )
  if(!modLog || modLog.permissionsFor(client.user.id).serialize().VIEW_CHANNEL == false && modLog.permissionsFor(client.user.id).serialize().SEND_MESSAGES == false || !message.mentions.users.first() || !args[1]){
      let embedS = new Discord.MessageEmbed()
         .setTitle(`Invalid usage!`)
         .setColor("RANDOM")
         .setDescription(`Usage: ${client.settings.get(message.guild.id).prefix}ban <user mention> <reason>`)
      return message.channel.send(embedS).then(msg => msg.delete({timeout: "6000"}))
  }
  let user = message.mentions.users.first()
  let reason = args.splice(1, args.length).join(' ') 
  let embedBanned = new Discord.MessageEmbed()
     .setTitle("Kick")
     .addField("Moderator", message.author.tag)
     .addField(`Target`, client.users.get(user.id).tag)
     .setColor("RANDOM")
     .addField(`Reason: ${reason}`)
  let embedSend = new Discord.MessageEmbed()
     .setTitle(`Kicked from ${message.guild.name}`)
     .setDescription(`Kicked by: ${message.author.tag}`)
     .addField(`Reason: ${reason}`)
     .setColor("RANDOM")
  client.users.get(user.id).send(embedSend)
  modLog.send(embedBanned)
  return message.guild.members.get(user.id).kick(user.id, 2);
}

exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: false,   
  aliases: [],
 botPerm: "BAN_MEMBERS",
  permNeed: "BAN_MEMBERS"
  };
  
  exports.help = {
    name: "ban",
    category: "Moderation",
    description: "Ban bad guy.",
    usage: "ban <user> <reason>"
  };
  
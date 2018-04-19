const Discord = require("discord.js")
exports.run = async (client, message, args) => {
 

  let user = message.mentions.users.first()
  let reason = args.splice(1, args.length).join(' ') 
  let embedBanned = new Discord.MessageEmbed()
     .setTitle("Ban")
     .addField("Moderator", message.author.tag)
     .addField(`Target`, client.users.get(user.id).tag)
     .setColor("RANDOM")
     .addField(`Reason: ${reason}`)
  let embedSend = new Discord.MessageEmbed()
     .setTitle(`Banned from ${message.guild.name}`)
     .setDescription(`Banned by: ${message.author.tag}`)
     .addField(`Reason: ${reason}`)
     .setColor("RANDOM")
  client.users.get(user.id).send(embedSend)
  modLog.send(embedBanned)
  return message.guild.members.get(user.id).ban(user.id, 2);
}

exports.conf = {
    enabled: true, ownerOnly: false,
    guildOnly: false,
aliases: [],
   botPerm: "KICK_MEMBERS",
    permNeed: "KICK_MEMBERS"
  };
  
  exports.help = {
    name: "ban",
    category: "Moderation",
    description: "Ban bad guy.",
    usage: "ban <user> <reason>"
  };
  
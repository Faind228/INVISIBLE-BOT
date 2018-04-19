
const Discord = require('discord.js')

exports.run = async (client, message, args) => {
  const key = `${message.guild.id}-${message.author.id}`;
    // return message.channel.send(`You currently have ${client.points.getProp(key, "points")}, and are level ${client.points.getProp(key, "level")}!`);
    let embed = new Discord.MessageEmbed()
       .setColor('RANDOM')
       .setTitle(`Level and points.`)
       .setDescription(`You can level up by sending messages`)
       .addField(`Points`, `**${client.points.getProp(key, "points")}**`,true)
       .addField(`Level`, `**${client.points.getProp(key, "level")}**`,true)
    return message.channel.send(embed)
}

exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: false,   
  aliases: [],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
  };
  
  exports.help = {
    name: "points",
    category: "Leveling system",
    description: "See your current level & points.",
    usage: "points"
  };
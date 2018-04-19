const Discord = require("discord.js")
exports.run = (client, message, args) => {
const Discord = require("discord.js")
 let user = client.GA(message, args).user
 let embed = new Discord.MessageEmbed()
    .setTitle(user.username + " Avatar")
    .setColor("RANDOM")
    .setImage(user.displayAvatarURL())
 message.channel.send(embed)
}

exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: false,   
  aliases: ["pfp", "ava"],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
  };
  
  exports.help = {
    name: "avatar",
    category: "Miscelaneous",
    description: "Displays your avatar (pfp)",
    usage: "avatar <username or mention or id> "
  };
  
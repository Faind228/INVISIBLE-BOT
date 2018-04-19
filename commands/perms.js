exports.run = async (client, message, args) => {
    let Discord = require("discord.js")
    let string = '```md\n';
    let user = client.GA(message, args)
    message.channel.permissionsFor(user).toArray().map(p => string += `+ ${p.charAt(0) + p.toLowerCase().replace(/_/g, ' ').slice(1).replace(`vad`, `VAD`)}\n`)
    let finalStr = string + "```"
    let embed = new Discord.MessageEmbed()
       .setTitle(`Permissions for ${user.user.tag}`)
       .setDescription(finalStr)
       .setColor("RANDOM")
    message.channel.send(embed)
}

exports.conf = {
    enabled: true, ownerOnly: true,
    guildOnly: false,
    aliases: [],
   botPerm: "VIEW_CHANNEL",
    permNeed: "VIEW_CHANNEL"
    };
    
    exports.help = {
      name: "perms",
      category: "Miscelaneous",
      description: "Get user permission.",
      usage: "perms [user/id/tag]"
    };
    
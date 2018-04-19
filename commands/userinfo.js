
exports.run = (client, message, args) => {

  const moment = require("moment-timezone");
  const dateFormat = require('dateformat');
  const Discord = require("discord.js")
  let user = client.GA(message, args).user
  let member = client.GA(message, args)
      dateFormat('dddd, mmmm dS, yyyy, h:MM:ss TT');
  const millisCreated = new Date().getTime() - user.createdAt.getTime();

  const millisCreated2 = new Date().getTime() - member.joinedAt.getTime();

  const daysCreated = millisCreated / 1000 / 60 / 60 / 24;
  const daysCreated2 = millisCreated2 / 1000 / 60 / 60 / 24;



  const embed = new Discord.MessageEmbed()
  .setThumbnail(user.displayAvatarURL())
  .setAuthor(`Info for ${user.tag}`, user.displayAvatarURL)
  .setColor("RANDOM")
  .addField(`Username`, user.username, true)
  .addField(`Discriminator`, user.discriminator,true)
  .addField(`ID`, user.id,true )
  .addField("Nickname", member.nickname || "None", true)
  .addField("Status", user.presence.status, true)
  .addField("Now playing", user.presence.game ? user.presence.game.name : 'None', true)
  .addField(`Highest role`, member.roles.highest,true)
  .addField(`Perms`, user.permLevel,true)
  .addField("Created At", `${dateFormat(user.createdAt)} (That\'s ${daysCreated.toFixed(0)} days ago!)`)
  .addField("Joined At", `${dateFormat(member.joinedAt)} (That\'s ${daysCreated2.toFixed(0)} days ago!)`)

       message.channel.send(embed)
}
exports.conf = {
  enabled: true, ownerOnly: "false",
  guildOnly: false,   
  aliases: ["rolls", "dice"],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
  };
  
  exports.help = {
    name: "userinfo",
    category: "Guilds",
    description: "info about user",
    usage: "userinfo <user>"
  };
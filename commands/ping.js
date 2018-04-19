const Discord = require("discord.js")

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const embed1 = new Discord.MessageEmbed()
   .setTitle("Pinging...")
  const msg = await message.channel.send(embed1);

  const embed = new Discord.MessageEmbed()
     .setTitle(":ping_pong: Pong!")
     .setDescription(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`)
     .setColor("RANDOM")
  msg.edit(embed);
};

exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: false,   
  aliases: [],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
  usage: "ping"
};

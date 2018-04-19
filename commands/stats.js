const Discord = require("discord.js")

const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const send = require("quick.hook")

exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
  const embedStats = new Discord.MessageEmbed()
    .setTitle("__** STATS **__")
    .setColor("RANDOM")
    .addField("• Mem Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
    .addField("• Uptime ", `__${duration}__`, true)
    .addField("• Users", `__${client.users.size.toLocaleString()}__`, true)
    .addField("• Servers", `__${client.guilds.size.toLocaleString()}__`, true)
    .addField("• Channels ", `__${client.channels.size.toLocaleString()}__`, true)
    .addField("• Discord.js", `__v${version}__`, true)
    .addField("• Node", `__${process.version}__`, true)
    send(message.channel,embedStats, {
      name: "Stats",
      icon: "https://i.imgur.com/sYi5QZ3.png"
    })
};

exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: false,   
  aliases: [],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics",
  usage: "stats"
};

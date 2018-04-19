const Discord = require("discord.js")
      send = require("quick.hook")
exports.run = async (client, message, args) => {// eslint-disable-line no-unused-vars
  const embedReloadNoCmd = new Discord.MessageEmbed()
     .setTitle("Must provide a command to reload. Derp.")
     .setColor("RANDOM")
  if (!args || args.length < 1) return message.channel.send(embedReloadNoCmd)
  let response = await client.unloadCommand(args[0]);

  const embedReloadUnloadErr = new Discord.MessageEmbed()
    .setTitle(`Error Unloading: ${response}`)
    .setColor("RANDOM")
  if (response) return message.channel.send(embedReloadUnloadErr)

  response = client.loadCommand(args[0]);

  const embedReloadErr = new Discord.MessageEmbed()
     .setTitle(`Error Loading: ${response}`)
     .setColor("RANDOM")
  if (response) return message.channel.send(embedReloadErr)
  const embedReloadSucc = new Discord.MessageEmbed()
     .setTitle(`The command \`${args[0]}\` has been reloaded`)
     .setColor("RANDOM")
     message.channel.send(embedReloadSucc)
};

exports.conf = {
  enabled: true, ownerOnly: true,
  guildOnly: false,   
  aliases: [],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command that\"s been modified.",
  usage: "reload [command]"
};

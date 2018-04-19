exports.run = async (client, message, args) => {// eslint-disable-line no-unused-vars
  const DISCORD = require("discord.js")
   const send = require("quick.hook")
   const embedReboot = new DISCORD.MessageEmbed()
      .setTitle("Bot is shutting down.")
      .setColor("RANDOM")
await message.channel.send(embedReboot)
  client.commands.forEach( async cmd => {
    await client.unloadCommand(cmd);
  });
  process.exit(1);
};

exports.conf = {
  enabled: true, ownerOnly: true,
  guildOnly: false,   
  aliases: [],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
};

exports.help = {
  name: "reboot",
  category: "System",
  description: "Shuts down the bot. If running under PM2, bot will restart automatically.",
  usage: "reboot"
};

exports.run = (client, message, args) => {
    const db = require('quick.db');
    const { MessageEmbed } = require('discord.js');
    try{let user = message.mentions.users.first().id} catch (err) { return message.reply("**Mention user, thanks.!!**\n **Error: **"+ err) }
    let usernick = message.mentions.users.first()
    const send  = require("quick.hook")
    if(isNaN(args[1])) return message.reply(`${args[1]} isn't an **integer (number)**`)
    let money = parseInt(args[1])
    message.reply(typeof money)
    try{db.add(`G_${message.guild.id}_${usernick.id}`,money).then(i => {
        var embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(':bank: The Bank')
            .setDescription('You granted :dollar: ' + money + ' to ' +  message.mentions.users.first());
            send(message.channel,embed, {
                name: "Bank",
                icon: "https://cdn2.iconfinder.com/data/icons/money-finance/512/bank-128.png"
              })
    })} catch(err) {
        message.reply("Error!" + err)
    }

}
exports.conf = {
    enabled: true, ownerOnly: false,
    guildOnly: true,
    aliases: ["grant", "moneygive"],
    botPerm: "VIEW_CHANNEL",
    permNeed: "MANAGE_MESSAGES"
  };
  
  exports.help = {
    name: "givemoney",
    category: "Economy",
    description: "Gives money to a user",
    usage: "givemoney <user> <money>"
  };
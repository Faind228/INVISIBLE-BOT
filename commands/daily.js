
const { MessageEmbed } = require('discord.js');
const timedOut = []; // Empty array for Daily Command
const send = require("quick.hook")
exports.run = (client, message, args) => {
const randomized = Math.floor(Math.random() * 150);
let user = message.mentions.users.first();
const db = require("quick.db")

		if (!user) {
			user = message.author
		}

		if (timedOut.includes(message.author.id)) {
      return send(message.channel,'Please wait 24 Hours or Less until you can get Your Daily Money Again!', {
        name: "Eval",
        icon: "https://cdn2.iconfinder.com/data/icons/money-finance/512/bank-128.png"
      })
		} else {
			db.add(`G_${message.guild.id}_${user.id}`, randomized).then(i => {
				var embed = new MessageEmbed()
					.setColor("RANDOM")
					.setTitle(':bank: The Bank') 
					.setDescription('The bank gave you :dollar: ' + randomized);
				send(message.channel,embed, {
        name: "Bank",
        icon: "https://cdn2.iconfinder.com/data/icons/money-finance/512/bank-128.png"
      })
				timedOut.push(message.author.id);
			})
			setTimeout(function() {
				var index = timedOut.indexOf(message.author.id);
				if (index > -1) {
					timedOut.splice(index, 1)
				}
			}, 86400000)
        }
}
exports.conf = {
    enabled: true, ownerOnly: false,
    guildOnly: false,
    aliases: ["free", "dailys"],
   botPerm: "VIEW_CHANNEL",
    permNeed: "VIEW_CHANNEL"
  };
  
  exports.help = {
    name: "daily",
    category: "Economy",
    description: "Daily free money.",
    usage: "daily"
  };
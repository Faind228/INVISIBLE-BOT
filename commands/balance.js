const { MessageEmbed } = require('discord.js');
exports.run = (client, message, args) => {
let user = message.mentions.users.first();
const db = require("quick.db")

		if (!user) {
			user = message.author
		}
   
		db.fetch(`G_${message.guild.id}_${user.id}`).then(i => {
			var embed = new MessageEmbed()
				.setColor("RANDOM")
				.setTitle(':bank: The Bank')
				.setDescription(`The account/user named: ${user.tag}\nHas :dollar: ${i} in his/her account.`)
			message.channel.send(embed)
    })
    }
    exports.conf = {
        enabled: true, ownerOnly: false,
        guildOnly: false,
        aliases: ["bal", "money"],
       botPerm: "VIEW_CHANNEL",
        permNeed: "VIEW_CHANNEL"
      };
      
      exports.help = {
        name: "balance",
        category: "Economy",
        description: "Shows your balance",
        usage: "balance <user>"
      };
const send = require("quick.hook")
const { MessageEmbed } = require("discord.js")
const dateFormat = require('dateformat');
exports.run = (client, message, args) => {
    const now = new Date();
    dateFormat(now, '***On dddd, mmmm dS, yyyy, h:MM:ss TT***');

	let region = {
		"brazi": "**Brazil** :flag_br:",
		"eu-central": "**Central Europe** :flag_eu:",
        "singapore": "**Singapore** :flag_sg:",
        "us-central": "**U.S. Central** :flag_us:",
        "sydney": "**Sydney** :flag_au:",
        "us-east": "**U.S. East** :flag_us:",
        "us-south": "**U.S. South** :flag_us:",
        "us-west": "**U.S. West** :flag_us:",
        "eu-west": "**Western Europe** :flag_eu:",
        "singapore": "**Singapore** :flag_sg:",
        "london": "**London** :flag_gb:",
        "japan": "**Japan** :flag_jp:",
        "russia": "**Russia** :flag_ru:",
        "hongkong": "**Hong Kong** :flag_hk:"
	}
	


let icon;
if (message.guild.iconURL) {
    icon = message.guild.iconURL
}
if (!message.guild.iconURL) {
    icon = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Blue_computer_icon.svg/2000px-Blue_computer_icon.svg.png"
}
let owner = message.guild.owner.user
if (!owner) {
    owner = "None for some reason..."
};

const verificationLevels = ['**None**', '**Low**', '**Medium**', '**(╯°□°）╯︵ ┻━┻** (High)', '**┻━┻彡 ヽ(ಠ益ಠ)ノ彡┻━┻** (Extreme)'];
const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });

const embed = new MessageEmbed()
   .setThumbnail(icon)
   .setImage(icon)
   .setAuthor(`${message.guild.name}`, icon)
   .setColor("RANDOM")
   .addField("Owner", `${owner.username}#${owner.discriminator}`, true)
   .addField("Region ", `${region[message.guild.region]}`, true)
   .addField(`Guild id: `, "``"+ message.guild.id + "``", true)
   .addField("Verification Level", `**${verificationLevels[message.guild.verificationLevel]}**`, true)
   .addField(`Members (${message.guild.members.size})`, `Users: ${message.guild.members.filter(m => !m.user.bot).size}\nBots: ${message.guild.members.filter(m => m.user.bot).size}`, true)
   .addField(`Channels (${message.guild.channels.size})`, `Text: ` + "``" + message.guild.channels.filter(m => m.type === 'text').size + "``" + "\n" + "Voice: " + "``" + message.guild.channels.filter(m => m.type === 'voice').size + "``" + "\n"+ "Category: " + "``" + message.guild.channels.filter(m => m.type === 'category').size + "``", true )
   .addField("Roles",message.guild.roles.map(i => i.name).join(" ❱ "),true )
   .addField("Created on", `${dateFormat(message.guild.createdAt)}`,true)

   message.channel.send(embed)
}

exports.conf = {
    enabled: true, ownerOnly: false,
    guildOnly: true,
    aliases: ["si", "infoserver"],
   botPerm: "VIEW_CHANNEL",
    permNeed: "VIEW_CHANNEL"
  };
  
  exports.help = {
    name: "serverinfo",
    category: "Guilds",
    description: "info about this server",
    usage: "serverinfo"
  };
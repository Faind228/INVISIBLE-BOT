const Discord = require("discord.js")

exports.run = (client, message, args) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = client.commands.filter(cmd => cmd.conf.guildOnly !== true);

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands "aligned" in the output.
    const commandNames = myCommands.keyArray();
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    let currentCategory = "";
    let output = "Here you can find all my commands!"
    
    const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
    sorted.forEach( c => {
      const cat = c.help.category.toProperCase();
      if (currentCategory !== cat) {
        output += `\u200b\n  __**${cat}**__ \n`;
        currentCategory = cat;
      }
      output += `${message.settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} - *${c.help.description}*\n`;
    });
    let embed = new Discord.MessageEmbed()
       .setTitle("Help")
       .setDescription(output)
       .setColor("RANDOM")
       .setAuthor("INVISIBLE BOT | v0.2", "http://overcomingsocialanxiety.com/wp-content/uploads/2015/06/invisible-man-with-social-anxiety1.png")
       .setFooter(`Command List\n\n[Use ${message.settings.prefix}help <commandname> for details]\n`,"http://overcomingsocialanxiety.com/wp-content/uploads/2015/06/invisible-man-with-social-anxiety1.png" ) 
       message.channel.send(embed)
  } else {
    // Show individual command's help.
    let command = args[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      let embed = new Discord.MessageEmbed()
        .setTitle(`**${command.help.name}** `)
        .setColor("RANDOM")
        .setDescription(`\n${command.help.description}\n**Usage**: ${command.help.usage}\n**Aliases**: ${command.conf.aliases.join(", ")}`)
        .setAuthor(`INVISIBLE BOT | v0.2`)
     return message.channel.send(embed)
    }
  }
};


exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: false,
  aliases: ["h", "halp"],
     botPerm: "VIEW_CHANNEL",
      permNeed: "VIEW_CHANNEL"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command]"
};

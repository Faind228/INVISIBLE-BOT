// The EVAL command will execute **ANY** arbitrary javascript code given to it.
// THIS IS PERMISSION LEVEL 10 FOR A REASON! It's perm level 10 because eval
// can be used to do **anything** on your machine, from stealing information to
// purging the hard drive. DO NOT LET ANYONE ELSE USE THIS

// We need to require the 

const Discord = require("discord.js")
exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  const code = args.join(" ");
  try {
    const evaled = eval(code);
    const clean = await client.clean(client, evaled);
    const embdedd = new Discord.MessageEmbed()
      .setTitle("**__EVAL__**")
      .setDescription(`\`\`\`js\n${clean}\n\`\`\``)
      .setColor("RANDOM") 
      message.channel.send(embdedd)
  } catch (err) {
    const embederrro = new Discord.MessageEmbed()
       .setTitle("``"+ "ERROR" + "``")
       .setDescription(`\`\`\`js\n${await client.clean(client, err)}\n\`\`\``)
       .setColor("RANDOM")
       message.channel.send(embederrro)
  }
};

exports.conf = {
  enabled: true, ownerOnly: true,
  guildOnly: false,   
  aliases: [],
 botPerm: "VIEW_CHANNEL",
  permNeed: "VIEW_CHANNEL"
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary javascript.",
  usage: "eval [...code]"
};

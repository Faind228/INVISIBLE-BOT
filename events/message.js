

module.exports = async(client, message) => {
  if (message.author.bot) return;
let set = require("../config.js")
  const settings = message.guild
    ? client.settings.get(message.guild.id)
    : client.config.defaultSettings;


  message.settings = settings;


  if (message.content.indexOf(settings.prefix) !== 0) return;

  const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

  if (!cmd) return;


  if(cmd.conf.ownerOnly === true && client.config.ownerID !== message.author.id){
    if(settings.systemNotice === "true"){
      return client.QE(message, "Only owner can use this command.")
    }
    else{return}
  }
  if (cmd && !message.guild && cmd.conf.guildOnly)
    return await client.QE(message, "This command is unavailable with private message. Please run this command in a guild.")
  if(cmd.conf.botPerm){
  if(message.channel.type !== "dm" && !message.guild.members.get(client.user.id).hasPermission(cmd.conf.botPerm)){
    if(settings.systemNotice === "true"){
      return await client.QE(message, `**I do not have \`${cmd.conf.botPerm}\` permission!**`)
    }
    else{
      return;
    }
  }
}

if(message.channel.type !== "dm" && !message.member.hasPermission(cmd.conf.permNeed)){
  if(settings.systemNotice === "true"){
    return client.QE(message, `You do not have \`${cmd.conf.permNeed}\` permission.`)
  }
  else{
    return;
  }
}

  
  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }


  

 
  client.logger.cmd(`[CMD]  ${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`);

 

  cmd.run(client, message, args);
};

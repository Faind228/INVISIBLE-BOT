const { inspect } = require("util");

// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
exports.run = async (client, message, [action, key, ...value]) => { // eslint-disable-line no-unused-vars

  // Retrieve current guild settings
  const settings = client.settings.get(message.guild.id);
  const Discord = require("discord.js")

  // First, if a user does `-set add <key> <new value>`, let's add it
  if (action === "add") {
    const embedKey = new Discord.MessageEmbed()
       .setTitle("Please specify a key to add!")
       .setColor("RANDOM")


    const embedAlready = new Discord.MessageEmbed()
       .setTitle("This key already exists in the settings")
       .setColor("RANDOM")


    const embedSpecify = new Discord.MessageEmbed()
       .setTitle("Please specify a value")
       .setColor("RANDOM")

       
    if (!key) return message.channel.send(embedKey)
    if (settings[key]) return message.channel.send(embedAlready)
    if (value.length < 1) return message.channel.send(embedSpecify)

    // `value` being an array, we need to join it first.
    settings[key] = value.join(" ");

    // One the settings is modified, we write it back to the collection
    client.settings.set(message.guild.id, settings);
    const embedSucAdd = new Discord.MessageEmbed()
       .setTitle(`${key} successfully added with the value of ${value.join(" ")}`)
       .setColor("RANDOM")

       
       message.channel.send(embedSucAdd)
  } else

  // Secondly, if a user does `-set edit <key> <new value>`, let's change it
  if (action === "edit") {
    const embedSpecifyKey = new Discord.MessageEmbed()
        .setTitle("Please specify a key to edit")
        .setColor("RANDOM")


    if (!key) return message.channel.send(embedSpecifyKey)
    const embedKeyNotExist = new Discord.MessageEmbed()
       .setTitle("This key does not exist in the settings")
       .setColor("RANDOM")


    if (!settings[key]) return message.channel.send(embedSpecifyKey)
    const embedSpecifyNewValue = new Discord.MessageEmbed()
       .setTitle("Please specify a new value")
       .setColor("RANDOM")


    if (value.length < 1) return message.channel.send(embedSpecifyNewValue)

    settings[key] = value.join(" ");

    client.settings.set(message.guild.id, settings);
    const embedSuccEdit = new Discord.MessageEmbed()
       .setTitle(`${key} successfully edited to ${value.join(" ")}`)
       .setColor("RANDOM")


       message.channel.send(embedSuccEdit)
  
  } else

  // Thirdly, if a user does `-set del <key>`, let's ask the user if they're sure...
  if (action === "del") {
    const embedDelSpecify = new Discord.MessageEmbed()
    .setTitle("Please specify a key to delete.")
    .setColor("RANDOM")

    
    if (!key) return message.channel.send(embedDelSpecify)

    const embedDelNotExist = new Discord.MessageEmbed()
       .setTitle("This key does not exist in the settings")
       .setColor("RANDOM")


    if (!settings[key]) return message.channel.send(embedDelNotExist)

    // Throw the 'are you sure?' text at them.
    const embedThrowPermDelete = new Discord.MessageEmbed()
       .setTitle(`Are you sure you want to permanently delete ${key}? This **CANNOT** be undone.`)
       .setColor("RANDOM")


    const response = await client.awaitReply(message, message.channel.send(embedThrowPermDelete));

    // If they respond with y or yes, continue.
    if (["y", "yes"].includes(response)) {

      // We delete the `key` here.
      delete settings[key];
      client.settings.set(message.guild.id, settings);

      const embedDelSucc = new Discord.MessageEmbed()
         .setTitle(`${key} was successfully deleted.`)
         .setColor("RANDOM")


         message.channel.send(embedDelSucc)
    } else
    // If they respond with n or no, we inform them that the action has been cancelled.
    if (["n","no","cancel"].includes(response)) {

      const embedDelCanc = new Discord.MessageEmbed()
         .setTitle("Action cancelled.")
         .setColor("RANDOM")


         message.channel.send(embedDelCanc)
    }
  } else

  if (action === "get") {

    const embedgetSpecify = new Discord.MessageEmbed()
       .setTitle("Please specify a key to view")
       .setColor("RANDOM")


    if (!key) return message.channel.send(embedgetSpecify)

    const embedGetDoesnt = new Discord.MessageEmbed()
      .setTitle("This key does not exist in the settings")
      .setColor("RANDOM")



    if (!settings[key]) return message.channel.send(embedGetDoesnt)
    
    const embedGetokok = new Discord.MessageEmbed()
       .setTitle(`The value of ${key} is currently` + " __**"  + settings[key] + "**__ ")  
       .setColor("RANDOM")


    message.channel.send(embedGetokok)

  } else {
  //     { prefix: '-',
  // modLogChannel: 'mod-log',
  // modRole: 'Moderator',
  // adminRole: 'Administrator',
  // systemNotice: 'false',
  // welcomeChannel: 'welcome',
  // welcomeMessage: 'Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D',
  // welcomeEnabled: 'false',
  // leaveChannel: 'welcome',
  // leaveMessage: 'Say bye to {{user}} :(',
  // leaveEnabled: 'false' }
      embedGetIDK = new Discord.MessageEmbed()
      .setTitle(":white_check_mark: Get")
      .setDescription(`\`\`\`md\n

# Prefix
> ${client.settings.get(message.guild.id).prefix}

# Moderation log channel
> ${ client.settings.get(message.guild.id).modLogChannel}

# System notice
> ${ client.settings.get(message.guild.id).systemNotice}

# Channel for welcome messages
> ${ client.settings.get(message.guild.id).welcomeChannel}

# Message for welcome message ({{user}} means user's name)
> ${ client.settings.get(message.guild.id).welcomeMessage}

# Welcome messages enabled?
> ${ client.settings.get(message.guild.id).welcomeEnabled}

# Channel for leaving messages
> ${ client.settings.get(message.guild.id).leaveChannel}

# Message for leaving message ({{user}} means user's name)
> ${ client.settings.get(message.guild.id).leaveMessage}

# Leave messages enabled?
> ${ client.settings.get(message.guild.id).leaveMessage}
\n\`\`\``.replace(`true`, `Yes`).replace(`false`, `No`))
      .setColor("RANDOM")
      return message.channel.send(embedGetIDK)
    
  }
};

exports.conf = {
  enabled: true, ownerOnly: false,
  guildOnly: true,
  aliases: ["setting", "settings", "conf"],
  botPerm: "VIEW_CHANNEL",
      permNeed: "ADMINISTRATOR"
};

exports.help = {
  name: "set",
  category: "System",
  description: "View or change settings for your server.",
  usage: "set <view/get/edit> <key> <value>"
};

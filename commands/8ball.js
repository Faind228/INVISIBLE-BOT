exports.run = async (client, message, args) => {
    let Discord = require("discord.js")
    let answers = ["Maybe", "No", "I don't think so", "Sings says yes!", "Totally no", "Yes"]
    let answerN = Math.round(Math.random() * answers.length)
    let question = args.join(" ")
    if(!question.includes("?") || question.length < 8){
        return client.QE(message, "Please ask full question!")
    }

    let ans = new Discord.MessageEmbed()
       .setTitle(`:8ball:  **8ball**`)
       .setColor("RANDOM")
       .addField(`**Question**`, question)
       .addField(`**Answer**`, answers[answerN])
    return message.channel.send(ans)
    
}


exports.conf = {
    
    enabled: true, ownerOnly: false,
    guildOnly: false,   
    aliases: ["magicball", "ball", "8", "ball8"],
   botPerm: "VIEW_CHANNEL",
    permNeed: "VIEW_CHANNEL"
  };
  
  exports.help = {
    name: "8ball",
    category: "Fun",
    description: "It'll answer your question by magic.",
    usage: "8ball <question>"
  };

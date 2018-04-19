exports.run = (client, message, args) => {
    const { MessageEmbed } = require('discord.js');
let user = message.mentions.users.first();
const db = require("quick.db")
const sleep = require("sleep")
const randoms = Math.floor(Math.random() * 2)

if (!user) {
  user = message.author
}
    
var embed = new MessageEmbed()
    .setColor("RANDOM")
    .setTitle(':bank: Rolling...')
    .setDescription(`Wait :o`)
db.fetch(`G_${message.guild.id}_${user.id}`).then(i => {
   message.channel.send(embed).then(m => {
   sleep.sleep(2)
    m.delete().then().catch(console.error);
        if(!args[0]){
            var embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(':bank: The Bank')
            .setDescription(`Supply number.`)
         return message.channel.send(embed)
    }
       
        if(i < args[0]){
            var embed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(':bank: The Bank')
            .setDescription(`You don't have `+ args[0] + " :dollar:")
            return message.channel.send(embed)
        }
    
        if(randoms == "1"){
            let kk = args[0]
            let ok = args[0] + randoms
            const random = Math.floor(Math.random() * ok);
            const hi = Math.floor(Math.random() * 10);
            db.add(`G_${message.guild.id}_${user.id}`, parseInt(random)).then(i => {
            var embedS = new MessageEmbed()
               .setColor("RANDOM")
               .setTitle(':bank: The Bank')
               .setDescription('The random gave you :dollar: ' + random + '\nYou now have :dollar: ' + i.toLocaleString());
            message.channel.send(embedS)
        });
        
        }
        else{
           db.subtract(`G_${message.guild.id}_${user.id}`, parseInt(args[0])).then(i => { 
              var embedS = new MessageEmbed()
                .setColor("RANDOM")
                .setTitle(':bank: The Bank')
                .setDescription('You lose :dollar: ' + args[0])
                .addField("Now you have :dollar: ", i.toLocaleString())
            message.channel.send(embedS)
            });
    
        }
    
    })
    })
    
    }  
    exports.conf = {
        enabled: true, ownerOnly: false,
        guildOnly: false,   
        aliases: [],
       botPerm: "VIEW_CHANNEL",
        permNeed: "VIEW_CHANNEL"
      };
      
      exports.help = {
        name: "roll",
        category: "Economy",
        description: "Randomise ur money.",
        usage: "roll <money>"
      };
    
        
const Discord = require("discord.js");
const client = new Discord.Client();
const token = "NzM1OTk3ODI1MDgyNzIwMjg5.XxobaA.bLq8oiUoGM-FG8FfsW7FeKG9Ebo";
const PREFIX = "!";

// Initialize
client.on('ready', () => {
    console.log("Maid Mint is here!");
    //client.user.setActivity('Niji no Conquistador', {type: 'WATCHING'}); //ver 12.2.0
    client.user.setPresence({
        game: {
            name: 'Niji no Conquistador',
            type: "Watching"
        }
    }); //ver 11.1.0
    //client.user.setGame('Niji no Conquistador');
});

// Greets member
client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "welcome");
    if(!channel) return;
    channel.send(`お帰りなさいませ、${member}ご主人様！, please read the rules and follow them!`);
    
    /*var role = member.guild.roles.find(role => role.name == "Fandôme");
    member.addRole(role);*/
});

// Add role on reaction
client.on('messageReactionAdd', (reaction, user) => {
  if (message.channel.id === '738484460227395595') {
    if (reaction.emoji.name === "kimoi") {
      const guildMember = reaction.message.guild.members.get(user.id);
      const role = reaction.message.guild.roles.get(role => role.name == "Fandôme");
      guildMember.addRole(role);
    }
  }
});

// Functions

client.on('message', message => {
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    const filter = (reaction, user) => ['mintsmug'].includes(reaction.emoji.name) && user.id === message.author.id;
                                                        // <<<<<<<<<< MODERATION >>>>>>>>>>>
    // !kick <user> <reason>
    if (cmd === `${PREFIX}kick`) {   
        // Check Role
        if (!message.member.roles.find(role => role.name === 'Moderators')) {
            message.channel.send('You do not have permission to use this command.');
            return;
        }
        
        if (args[0] == null) {
            message.channel.send('You need to specify a user for this kick. \n\`Usage: ' + PREFIX + 'kick <user> <reason>\`');
            return;
        } else if (args[1] == null) {
            message.channel.send('You need to specify a reason for this kick. \n\`Usage: ' + PREFIX + 'kick <user> <reason>\`');
            return;
        }
        
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if (!kUser) message.channel.send('That user is not in this server.');
        let kReason = args.join(" ").slice(22);
        
        if (kUser.roles.find(role => role.name === 'Moderators')) return message.channel.send("That user can't be kicked.");

        let kickEmbed = new Discord.RichEmbed().setDescription('~Kick~').setColor('#fff203').addField('Kicked User', `${kUser} with ID ${kUser.id}`).addField('Kicked By ', `${message.author} > with ID ${message.author.id}`).addField('Time ', message.createdAt).addField('Reason', kReason);

        let reportChannel = message.guild.channels.find(channel => channel.name === 'report');
        if (!reportChannel) return message.channel.send("Can't find #report channel.");

        message.guild.member(kUser).kick(kReason);
        message.channel.send(`Successfully kicked ${kUser}.`);
        reportChannel.send(kickEmbed);
    }

    // !ban <user> <reason>
    if (cmd === `${PREFIX}ban`) {   
        // Check Role
        if (!message.member.roles.find(role => role.name === 'Moderators')) {
            message.channel.send('You do not have permission to use this command.');
            return;
        }

        if (args[0] == null) {
            message.channel.send('You need to specify a user for this ban. \n\`Usage: ' + PREFIX + 'ban <user> <reason>\`');
            return;
        } else if (args[1] == null) {
            message.channel.send('You need to specify a reason for this ban. \n\`Usage: ' + PREFIX + 'ban <user> <reason>\`');
            return;
        }
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!bUser) message.channel.send('That user is not in this server.');
        let bReason = args.join(" ").slice(22);
        
        if (bUser.roles.find(role => role.name === 'Moderators')) return message.channel.send("That user can't be banned.");

        let banEmbed = new Discord.RichEmbed().setDescription('~Ban~').setColor('#eb4034').addField('Banned User', `${bUser} with ID ${bUser.id}`).addField('Banned By ', `${message.author} > with ID ${message.author.id}`).addField('Time ', message.createdAt).addField('Reason', bReason);

        let reportChannel = message.guild.channels.find(channel => channel.name === 'report');
        if (!reportChannel) return message.channel.send("Can't find #report channel.");

        message.guild.member(bUser).ban(bReason);
        message.channel.sendMessage(`Successfully banned ${bUser}.`);
        reportChannel.send(banEmbed);
    }

    // !unban <user> <reason>
    /*if (cmd === `${PREFIX}unban`) {   
        // Check Role
        if (!message.member.roles.find(role => role.name === 'Moderators')) {
            message.channel.send('You do not have permission to use this command.');
            return;
        }

        if (messageArray[1] == null) {
            message.channel.sendMessage('You need to specify a user for this unban. \n\`Usage: ' + PREFIX + 'unban <user> <reason>\`');
            return;
        } else if (messageArray[2] == null) {
            message.channel.sendMessage('You need to specify a reason for this unban. \n\`Usage: ' + PREFIX + 'unban <user> <reason>\`');
            return;
        }
        let uUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!uUser) message.channel.send('That user is not in this server.');
        let uReason = args.join(" ").slice(22);

        let unbanEmbed = new Discord.RichEmbed().setDescription('~Unban~').setColor('#66ffcc').addField('Unbanned User', `${uUser} > with ID ${uUser.id}`).addField('Unbanned By ', `${message.author} > with ID ${message.author.id}`).addField('Time ', message.createdAt).addField('Reason', uReason);

        let reportChannel = message.guild.channels.find(channel => channel.name === 'report');
        if (!reportChannel) return message.channel.send("Can't find #report channel.");

        message.guild.member(uUser).unban(uReason);
        message.channel.send(`Successfully unbanned ${uUser}.`);
        reportChannel.send(unbanEmbed);
    }*/

                                                                // <<<<<<<<<< MISCELLANOUS >>>>>>>>>
    // !say <text>
    if (cmd === `${PREFIX}say`) {
        // Check Role
        if (!message.member.roles.find(role => role.name === 'Moderators')) {
            message.channel.send('You do not have permission to use this command.');
            return;
        }

        if(args[0] == null) {
            message.channel.send('Missing argument(s). \n\`Usage: ' + PREFIX + 'say <text>\`');
            return;
        } else {
            message.delete();
            message.channel.send(args.join(" "));
        }
    }

    // !purge <amount>
    if (cmd === `${PREFIX}purge`) {
        async function purge() {
            // Check Role
            if (!message.member.roles.find(role => role.name === 'Moderators')) {
                message.channel.send('You do not have permission to use this command.');
                return;
            }

            if (isNaN(args[0])) {
                message.channel.send('You must specify a number as your argument. \n\`Usage: ' + PREFIX + 'purge <amount>\`');
                return;
            }
            
            if (args[0] < 2 || args[0] > 100) {
                message.channel.send('You must specify a number between 2 and 100. \n\`Usage: ' + PREFIX + 'purge <amount>\`');  
                return;
            }

            message.delete();
            const fetched = await message.channel.fetchMessages({ limit: args[0] });
            console.log(fetched.size + ' messages found, deleting...');
            message.channel.bulkDelete(fetched).catch(error => message.channel.send(`Error: ${error}`));
        }
        
        purge();
    }
    
    // !getrolemessage
    if (cmd === `${PREFIX}getrolemessage`){
        // Check Role
        if (!message.member.roles.find(role => role.name === 'Moderators')) {
            message.channel.send('You do not have permission to use this command.');
            return;
        }
        
        const fandome = message.guild.roles.get('738485578085040208');

        message.channel.send('React to this message with :mintsmug: to get Fandôme role and access the rest of the server!').then(async msg => {
            await msg.react('mintsmug'); 

            msg.awaitReactions(filter, {
                max: '1',
                time: 30000,
                errors: ['time']
            }).then(collected => {
                const reaction = collected.first();

                switch (reaction.emoji.name){
                    case 'mintsmug':
                        message.member.addRole(fandome).catch(err => {
                            console.log(err);
                            return message.channel.send(`Error adding you to this role: ${err.message}.`)
                        });
                        message.channel.send(`You have been added to the **${fandome.name}**!`).then(m => m.delete(3000));
                        msg.delete();
                        break;
                }
            }).catch(collected =>{
                return message.channel.send("Can't add you to this role.");
            });
        });
    }
})

client.login(token);

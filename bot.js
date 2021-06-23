const discord = require('discord.js');
const fs = require('fs');
const http = require('http');
const db = require('quick.db');
const moment = require('moment')
const express = require('express');
const jkood = require('./jkood.js');
const app = express();
app.get("/", (request, response) => {
response.sendStatus(200);
});
app.listen(process.env.PORT);


//READY.JS

const Discord = require('discord.js');
const client = new Discord.Client();
client.on('ready', async () => {
   client.appInfo = await client.fetchApplication();
  setInterval( async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);
  
 client.user.setActivity(`youtube.com/jkood`, { type:'WATCHING' })
  
  console.log("youtube.com/jkood Bot Başladı")
});

const log = message => {
  console.log(` ${message}`);
};
require('./util/eventLoader.js')(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
           reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === jkood.sahip) permlvl = 4;
    return permlvl;
};
client.login(process.env.TOKEN)


//-----------------------KOMUTLAR-----------------------\\

//BOTU SESTE TUTMA

client.on("ready", async () => {
  console.log("Bot Başarıyla Ses Kanalına Bağlandı")
  let botVoiceChannel = client.channels.cache.get("844183238083608606");
  if (botVoiceChannel) botVoiceChannel.join().catch(err => console.error("Bot ses kanalına bağlanırken bir hata oluştu!"));
});

//BOTU SESTE TUTMA

//CEZALI

client.on('ready', () => {
client.guilds.cache.forEach(guild => {
guild.members.cache.forEach(async user => {
let cezalımı = db.fetch(`cezali_${user.guild.id}.${user.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali");
const fetch = await db.fetch(user.user.id);
if(!fetch) return;
if((Date.now() <= fetch.end) || fetch) {
let kalan = fetch.end - Date.now();
let cezalı = jkood.Cezalı  
const log = jkood.modlog
setTimeout(() => {
 let cezalımı = db.fetch(`cezali_${user.guild.id}.${user.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali"); 
const tahliye = new Discord.MessageEmbed()
.setAuthor("Tahliye İşlemi Başarılı!")
.addField(`Tahliye Olan`, `<@!${user.user.id}>`)
.addField(`İşlemi Uygulayan`,`<@!${fetch.moderatorID}>`)
.addField(`Ceza Sebebi`, `${fetch.reason}`)
.setColor('BLUE')
.setFooter(`${fetch.istendi} Tarafından İstendi.`)
.setThumbnail(`${fetch.kullanıcıavatar}`)
.setTimestamp()
    client.channels.cache.get(log).send(tahliye)
user.roles.remove(cezalı)
db.delete(`cezali_${user.guild.id}.${user.id}`)  
db.delete(user.user.id)
}, kalan);
};
});
});
});

client.on('guildMemberAdd', () => {
client.guilds.cache.forEach(guild => {
guild.members.cache.forEach(async user => {
let cezalımı = db.fetch(`cezali_${user.guild.id}.${user.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali");
let cezalırol = jkood.Cezalı   
user.roles.add(cezalırol)
const fetch2 = await db.fetch(user.user.id);
if(!fetch2) return;
if((Date.now() <= fetch2.end) || fetch2) {
let kalan2 = fetch2.end - Date.now();  
const cezalıtahliye = new Discord.MessageEmbed()
.setAuthor("Ceza İşlemi Başarılı, Beni Kandıramassın!")
.addField(`İşlemi Uygulayan`,`<@!${fetch2.moderatorID}>`)
.addField(`Ceza Sebebin(Cezalıyken sunucudan çıktığın için aynı sebepden tekrar cezalandırıldın.)`, `${fetch2.reason}`)
.setColor('BLUE')
.setFooter(`${fetch2.istendi} Tarafından İstendi.`)
.setThumbnail(`${fetch2.kullanıcıavatar}`)
.setTimestamp()
    user.send(cezalıtahliye)
const fetch = await db.fetch(user.user.id);
if(!fetch) return;
if((Date.now() <= fetch.end) || fetch) {
let kalan = fetch.end - Date.now();
let cezalı = jkood.Cezalı  
const log = jkood.modlog
setTimeout(() => {
 let cezalımı = db.fetch(`cezali_${user.guild.id}.${user.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali"); 
const tahliye = new Discord.MessageEmbed()
.setAuthor("Tahliye İşlemi Başarılı!")
.addField(`Tahliye Olan`, `<@!${user.user.id}>`)
.addField(`İşlemi Uygulayan`,`<@!${fetch.moderatorID}>`)
.addField(`Ceza Sebebi`, `${fetch.reason}`)
.setColor('BLUE')
.setFooter(`${fetch.istendi} Tarafından İstendi.`)
.setThumbnail(`${fetch.kullanıcıavatar}`)
.setTimestamp()
    client.channels.cache.get(log).send(tahliye)
user.roles.remove(cezalı)
db.delete(`cezali_${user.guild.id}.${user.id}`)  
db.delete(user.user.id)
}, kalan);
};
};  
});
});
});

//CEZALI


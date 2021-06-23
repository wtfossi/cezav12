const Discord = require('discord.js');
const db = require('quick.db');
const jkood = require('../jkood.js');
const moment = require('moment')
moment.locale("tr")

exports.run = async(client, message, args) => {
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu Komutu Kullanabilmek İçin Yeterli Yetkiye Sahip Değilsin!`);
  
  let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if(!kişi) return message.reply('Lütfen Bir Kullanıcı veya ID Girin.')
  if (isNaN(kişi)) return message.channel.send("Lütfen Bir Geçerli ID Girin.");
   if (!kişi.roles.cache.has(jkood.yetkili)) return message.reply("Bu Kişi Yetkili Değil!")
  const user = message.guild.member(kişi)
  
  let mention = message.author;
if(message.mentions.members.first()) mention = message.mentions.members.first().user;
let mentionMember = message.guild.members.cache.get(mention.id);
  
  let rozetler = false;
if(mention.flags.toArray().length <= 0) {
rozetler = false;
} else {
rozetler = true;
};
  
  let mentionFlags = mention.flags.toArray().join(' | ')
.replace('HOUSE_BRAVERY', 'Bravery')  
.replace('HOUSE_BRILLIANCE', 'Brilliance')
.replace('HOUSE_BALANCE', 'Balance')
.replace('VERIFIED_DEVELOPER', '1. Dönemde Doğrulanmış Bot Geliştiricisi')
.replace('DISCORD_EMPLOYEE', 'Discord Çalışanı')
.replace('PARTNERED_SERVER_OWNER', 'Discord Partner')
.replace('HYPESQUAD_EVENTS', 'HypeSquad Events')
.replace('BUGHUNTER_LEVEL_1', 'Bug Avcısı 1. Lvl')
.replace('EARLY_SUPPORTER', 'Erken Destekçi')
.replace('TEAM_USER', 'Takım Üyesi')
.replace('SYSTEM', 'Sistem')
.replace('BUGHUNTER_LEVEL_2', 'Bug Avcısı 2. Lvl')
.replace('VERIFIED_BOT', 'Onaylı Bot');


  let sayı3 = 1
  let data3 = db.get("yetkilijkood."+message.guild.id+user.id)
  let kayetkili
  if(data3){
   kayetkili = db.get("yetkilijkood."+message.guild.id+user.id).map(jkoodcommunity => `**${sayı3++}. Ceza** \n**Kişi:** ${jkoodcommunity.cezaverdikleri}\n**Sebep:** ${jkoodcommunity.sebep}\n**Tarih:** ${jkoodcommunity.tarih}\n**----------------**`).slice(0, jkood.kayitedenler).join("\n")
  } else {
       kayetkili = "Verdiği Ceza Bulunamadı."
  }
  
  const toplambilgi = await db.fetch(`yetkilitoplamistatistik${user.id}.${message.guild.id}`)
  
    const embed = new Discord.MessageEmbed()
    .setAuthor(kişi.user.username, kişi.user.avatarURL({dynamic:true}))
    .setThumbnail(kişi.user.avatarURL(({dynamic:true})))
    .setTimestamp()
    .addField(`Adı Ve Hesap İD`, `${kişi.user.username}#${kişi.user.discriminator} (${kişi.user.id})`)
    .addField('Durum', mention.presence.status.replace('online', 'Çevrimiçi').replace('idle', 'Boşta').replace('dnd', 'Rahatsız Etmeyin').replace('offline', 'Çevrimdışı'))
    .addField(`Hesap Kuruluş Tarihi`, `${moment(kişi.user.createdAt).format(" DD/MMMM/YYYY ")}`, true)
    .addField(`Sunucuya Giriş Tarihi\n`, `${moment(kişi.joinedTimestamp).format('DD/MMMM/YYYY')}`, true)
    .addField(`Toplam Verdiği Ceza\n`, `${toplambilgi ? toplambilgi : '0'}`)
    .addField(`Verdiği Cezalar\n`, `${kayetkili}`)
    //.addField('Rozetler', `${rozetler ? mentionFlags : 'Yok'}`)
    .setFooter(`${message.author.tag} Tarafından İstendi.`)
    message.channel.send(embed)
};
exports.conf = {
 enabled: true,
 guildOnly: false,
 aliases: ["yetkiliprofil","yp"],
 permLevel: 0,
};
exports.help = {
 name: 'yetkili-profil'
};
const Discord = require("discord.js");
const db = require('quick.db');
const jkood = require('../jkood.js');
const zaman = require("useful-tools");
const ms = require('ms');
const moment = require('moment');
moment.locale('tr');

exports.run = async(client, message, args) => {
if(!message.member.roles.cache.has('853331202042757170')) return message.reply("Bu Komutu Kullanabilmek İçin Gerekli Yetkiye Sahip Değilsin!");
  
const cezalı = jkood.Cezalı
const log = jkood.modlog
const üye = jkood.üye

let kişi = message.mentions.members.first()
if(!kişi) return message.reply('Lütfen bir kullanıcı girin.')

if(kişi.id === message.author.id) return message.reply('Kendini Cezalıya Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === client.user.id)return message.reply('Botu Cezalıya Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === message.guild.OwnerID) return message.reply('Sunucu Sahibini Cezalıya Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.');
  const user = message.guild.member(kişi)
  
  let reason = args.slice(1).join(' ');
  if (reason.length < 1) return message.reply('Ceza bitirme sebebini yazmalısın.');


  message.delete()
  message.reply('İşlem Başarılı!').then(codework => codework.delete({timeout: 5000}));
     
   const tahliye = new Discord.MessageEmbed()
.setAuthor("Ceza Bitirme İşlemi Başarılı!")
.addField(`Cezası Bitirilen`, `${kişi}`)
.addField(`İşlemi Uygulayan`,`${message.author}`)
.addField(`Ceza Bitirme Sebebi`, reason)
.setColor('BLUE')
.setFooter(`${message.author.tag} Tarafından İstendi.`)
.setThumbnail(message.mentions.users.first().avatarURL(({dynamic:true})))
.setTimestamp()
    client.channels.cache.get(log).send(tahliye)
  
kişi.roles.remove(cezalı);  
db.delete(`cezali_${message.guild.id}.${user.id}`)
  
  

  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['ceza-bitir'],
    permLevel: 0,
}
exports.help = {
      name: "cezabitir"
}
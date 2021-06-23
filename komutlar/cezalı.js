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

let kişi = message.mentions.members.first()
if(!kişi) return message.reply('Lütfen bir kullanıcı girin.')

if(kişi.id === message.author.id) return message.reply('Kendini Cezalıya Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === client.user.id)return message.reply('Botu Cezalıya Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.')
if(kişi.id === message.guild.OwnerID) return message.reply('Sunucu Sahibini Cezalıya Atamazsın. Lütfen Geçerli Bir Kullanıcı Gir.');
  const user = message.guild.member(kişi)
  if (user.roles.cache.has(cezalı)) return message.reply("Bu Kişi Zaten Cezalı!")
  
  let argument_one = ['saniye', 'dakika', 'saat', 'gün'];
if(!args[1]) return message.channel.send(`Bir süre belirtmelisin.\nÖrnek: !mute ${message.mentions.members.first()} 5 gün reklam`);
if(!args[2]) return message.channel.send(`Geçerli bir zaman belirtmelisin.\n${argument_one.map(a => `**${a}**`).join('/')}`)
if(!argument_one.includes(args[2])) return message.channel.send(`Geçerli bir zaman belirtmelisin.\n${argument_one.map(a => `**${a}**`).join('/')}`)
  
  let reason = args.slice(3).join(' ');
  if (reason.length < 1) return message.reply('Ceza sebebini yazmalısın.');
  
  let end = Date.now()+ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day'));

db.set(user.user.id, { 
end: end,
start: Date.now(),
moderatorUsername: message.author.username,
moderatorID: message.author.id,
kullanıcıavatar: message.mentions.users.first().avatarURL(({dynamic:true})),  
moderatorAvatarURL: message.author.displayAvatarURL({ dynamic: true }),
istendi: message.author.tag,  
reason: reason
});

db.push("yetkilijkood."+message.guild.id+message.author.id,{
    cezaverdikleri: `${user}(${user.user.id})`,
    tarih: `${zaman.tarih(Date.now())}`,
    sebep: `${reason}`
  })
  
  db.push("jkood."+message.guild.id+user.user.id,{
    id: user.user.id,
    tarih: `${zaman.tarih(Date.now())}`,
    kaydeden: message.author.id,
    sebep: `${reason}`
  })
  message.delete()
  message.reply('İşlem Başarılı!').then(codework => codework.delete({timeout: 5000}));
  
  kişi.roles.add(cezalı)
  
const ceza = new Discord.MessageEmbed()
.setAuthor("Ceza İşlemi Başarılı!")
.addField(`Cezalıya Atılan`, `${kişi}`)
.addField(`İşlemi Uygulayan`,`${message.author}`)
.addField(`Ceza Sebebi`, reason)
.addField(`Ceza Bitişi`, `${moment(end+ms('3h')).format('DD.MM.YYYY - HH:mm:ss')}`)
.setColor('BLUE')
.setFooter(`${message.author.tag} Tarafından İstendi.`)
.setThumbnail(message.mentions.users.first().avatarURL(({dynamic:true})))
.setTimestamp()
client.channels.cache.get(log).send(ceza)
  
  db.set(`cezali_${message.guild.id}.${user.id}`, 'cezali')
  db.add(`toplamistatistik${user.id}.${message.guild.id}`, 1)
  db.add(`yetkilitoplamistatistik${message.author.id}.${message.guild.id}`, 1)
  
  
 setTimeout(function() {
   
let cezalımı = db.fetch(`cezali_${user.guild.id}.${user.id}`)
if (!cezalımı) return;
if (cezalımı == "cezali");
   
  kişi.roles.remove(cezalı);
   
   const tahliye = new Discord.MessageEmbed()
.setAuthor("Tahliye İşlemi Başarılı!")
.addField(`Tahliye Olan`, `${kişi}`)
.addField(`İşlemi Uygulayan`,`${message.author}`)
.addField(`Ceza Sebebi`, reason)
.setColor('BLUE')
.setFooter(`${message.author.tag} Tarafından İstendi.`)
.setThumbnail(message.mentions.users.first().avatarURL(({dynamic:true})))
.setTimestamp()
    client.channels.cache.get(log).send(tahliye)
db.delete(`cezali_${user.guild.id}.${user.id}`)
  }, ms(args[1]+' '+args[2].replace('dakika', 'minutes').replace('saat', 'hours').replace('saniye', 'seconds').replace('gün', 'day')));
  
  

  
}
  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['cezalıya-at'],
    permLevel: 0,
}
exports.help = {
      name: "cezalı"
}
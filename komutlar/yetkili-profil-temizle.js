const Discord = require('discord.js');
const db = require('quick.db');
const jkood = require('../jkood.js');

exports.run = (client, message, args) => {

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(':x: bu özelliği kullanabilmek için `Yönetici` yetkisine sahip olmalısınız')
 let yetkili = jkood.yetkili 
  
   let kişi = message.mentions.users.first();
  const user = message.guild.member(kişi)
   if (message.mentions.users.size < 1) return message.reply('Lütfen Profilini Temizleyeceğin Kişiyi Belirt.');
  if (!user.roles.cache.has(yetkili)) return message.reply("Bu Kişi Yetkili Değil!")
     if (db.has("yetkilijkood."+message.guild.id+user.id) === false) return message.reply("Belirtilen Kişinin Profili Zaten Temiz Görünüyor.")

       message.reply('Belirtilen Kişinin Profili Temizlenmiştir.')
   db.delete("yetkilijkood."+message.guild.id+user.id)
  db.delete(`yetkilitoplamistatistik${user.id}`)

}; 


exports.conf = { 
enabled: true,
guildOnly: false,
 aliases: ["yetkili-profil-sil","yetkiliprofiltemizle","ypt"], 
permLevel: 0
}

exports.help = {
 name: 'yetkili-profil-temizle', 
description: 'kayıt sistemini kapatır',
 usage: 'kayıt-kapat' 
};
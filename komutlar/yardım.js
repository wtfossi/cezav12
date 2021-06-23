const Discord = require('discord.js'); 
 
exports.run = async(client, message, args) => {
 
 const Embed = new Discord.MessageEmbed()
 .setTimestamp()
 .setColor("BLUE")
 .setThumbnail(message.author.avatarURL({ dynamic: true }))
 .setTitle(`YOUTUBE.COM/JKOOD`)
 .addField(`Cezalı`,`!cezalı @kişi süre sebep`)
 .addField(`Ceza Bitirme`,`!cezabitir @kişi sebep`)
 .addField(`Profil/Profil-Temizleme`,`!profil @etiket - !profil-temizle @etiket`)
 .addField(`Yetkili Profil/Yetkili-Profil-Temizleme`,`!yetkili-profil @etiket - !yetkili-profil-temizle @etiket`)
 .setFooter(`${message.author.tag} Tarafından İstendi.`)
 message.channel.send(Embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","help","y"],
  permLevel: 0
};

module.exports.help = {
  name: 'yardım',
  description: 'Yardım Menüsünü Gösterir.',
  usage: 'yardım'
};
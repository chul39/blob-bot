import { AttachmentBuilder, EmbedBuilder } from 'discord.js'

export default {

  name: "love",
  
  run: (client, message) => {

    const target = message.mentions.users.size ? message.mentions.users.first() : message.author  
    const percent = Math.floor(Math.random() * 100)
    const result = Math.floor(percent / 20)
    const file = new AttachmentBuilder(`./assets/images/blob-affection-${result}.png`)
    const embed = new EmbedBuilder()
      .setTitle(`ค่าความชอบต่อ ${target.username}: ${percent}%`)
	    .setImage(`attachment://blob-affection-${result}.png`)
      .setTimestamp()

    message.channel.send({ embeds: [embed], files: [file] })

  }
  
}
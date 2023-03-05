import { AttachmentBuilder, EmbedBuilder } from 'discord.js'

const headObj = {
  filePath: './assets/images/coin-head.png', 
  fileName: 'coin-head.png',
  text: "หัวปลา"
}

const tailObj = {
  filePath: './assets/images/coin-tail.png', 
  fileName: 'coin-tail.png',
  text: "หางปลา"
}

export default {

  name: "flipcoin",
  
  run: (client, message) => {

    const result = Math.random() < 0.5 ? headObj : tailObj
    const file = new AttachmentBuilder(result.filePath)
    const embed = new EmbedBuilder()
      .setTitle(`${result.text}`)
	    .setImage(`attachment://${result.fileName}`)
      .setTimestamp()
    
    message.channel.send({ embeds: [embed], files: [file] })

  }
  
}
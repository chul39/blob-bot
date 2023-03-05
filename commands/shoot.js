import { AttachmentBuilder, EmbedBuilder } from 'discord.js'
import Canvas from '@napi-rs/canvas'

const baseImgPath = './assets/images/blob-gun.png'
const { createCanvas, loadImage } = Canvas

export default {

  name: "shoot",
  run: async (client, message) => {

    const canvas = createCanvas(400, 200)
    const ctx = canvas.getContext('2d')
    const target = message.mentions.users.size ? message.mentions.users.first() : message.author
    const background = await loadImage(baseImgPath)
    const avatar = await loadImage(target.displayAvatarURL({ format: 'png', dynamic: true }))

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.drawImage(avatar, 200, 0, 200, 200)

    const file = new AttachmentBuilder(await canvas.encode('png'), { name: 'blob-shoot.png' })
    const embed = new EmbedBuilder()
      .setTitle("มีคนถูกยิง!")
      .setDescription(`<@${target.id}> ถูกยิง! ใครก็ได้เรียกรถพยาบาลที!`)
	    .setImage('attachment://blob-shoot.png')
      .setTimestamp()
   
    message.channel.send({ embeds: [embed], files: [file] })
    
  }
  
}
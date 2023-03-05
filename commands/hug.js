import { AttachmentBuilder, EmbedBuilder } from 'discord.js'
import Canvas from '@napi-rs/canvas'

const img1 = './assets/images/blob-hug-1.png'
const img2 = './assets/images/blob-hug-2.png'
const { createCanvas, loadImage } = Canvas

export default {

  name: "hug",

  run: async (client, message) => {

    const canvas = createCanvas(250, 257)
    const ctx = canvas.getContext('2d')
    const target = message.mentions.users.size ? message.mentions.users.first() : message.author
    const layer1 = await loadImage(img1)
    const layer2 = await loadImage(target.displayAvatarURL({ format: 'png', dynamic: true }))
    const layer3 = await loadImage(img2)

    ctx.drawImage(layer1, 0, 0, canvas.width, canvas.height)
    ctx.save()
    ctx.beginPath()
    ctx.arc(128.5, 160.5, 56.5, 0, Math.PI * 2);
    ctx.closePath()
    ctx.clip()
    ctx.drawImage(layer2, 72, 104, 113, 113)
    ctx.restore()
    ctx.drawImage(layer3, 0, 0, canvas.width, canvas.height)

    const file = new AttachmentBuilder(await canvas.encode('png'), { name: 'blob-hug.png' })
    const embed = new EmbedBuilder()
      .setTitle("บล็อบอยากมอบความรักให้คุณ!")
      .setDescription(`รักนะ <@${target.id}> 💗`)
	    .setImage('attachment://blob-hug.png')
      .setTimestamp()

    message.channel.send({ embeds: [embed], files: [file] })
  
  }
  
}
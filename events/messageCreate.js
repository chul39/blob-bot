export default async (client, message) => {

  try {

    if (message.author.bot) return

    if (message.content.startsWith(process.env.DISCORD_PREFIX) && !message.author.bot) {
  
      let args = message.content.slice(process.env.DISCORD_PREFIX.length + 1).split(' ')
      const cmd = args.shift().toLowerCase()
      const command = client.commands.find(c => c.name === cmd)
    
      if (command) command.run(client, message, args)

    } else {

      if (message.mentions.users.size === 1 && message.content.startsWith(`<@${process.env.DISCORD_BOT_ID}>`)) {
        const content = message.content.replace(`<@${process.env.DISCORD_BOT_ID}>`, '').trim()
        if (content) client.commands.find(c => c.name === 'chat').run(client, message, [content])
      }

    }

  } catch (err) {

    console.error(err)

  }

}
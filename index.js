// Import dependencies
import * as fs from 'fs'
import { Client, GatewayIntentBits, Collection } from 'discord.js'
import dotenv from 'dotenv'

// .env config
dotenv.config()

// Discord client setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
})
client.login(process.env.DISCORD_TOKEN)
client.commands = new Collection()
client.events = new Collection()

// Import commands
fs.readdir('./commands/', (err, files) => {
  files.forEach(async (file) => {
    try {
      const props = await import(`./commands/${ file }`)
      client.commands.set(props.default.name, props.default)
    } catch (err) {
      console.error(err)
    }
  })
})

// Import events
fs.readdir('./events/', (err, files) => {
  files.forEach(async (file) => {
    const props = await import(`./events/${ file }`)
    client.on(file.replace(".js", ""), props.default.bind(null, client))
  })
})
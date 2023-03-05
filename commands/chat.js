import { Configuration, OpenAIApi } from 'openai'

const openAIApiConfiguration = new Configuration({
  organization: process.env.OPENAI_ORG,
  apiKey: process.env.OPENAI_KEY
})

const openai = new OpenAIApi(openAIApiConfiguration)

let messageDict = []
let historyDict = []

const addMessageToDict = (user, role, message) => {
  messageDict.push({
    role: role,
    content: message,
  })
  historyDict.push({
    user: user,
    role: role,
    content: message,
    timestamp: new Date().toString()
  })
}
  
export default {
  
  name: "chat",

  run: async (client, message, args) => {

    if (args[0] === "clear-history") {
      messageDict = []
      message.reply("เราลืมเรื่องที่คุยเมื่อกี้ไปหมดแล้วนะ :)")
      return
    }

    if (args[0] === "check-history") {
      historyDict.forEach(e => {
        message.reply(JSON.stringify(e))
      })
      return
    }

    try {
      addMessageToDict(message.author.username, "user", args.join(" "))
      const gptResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageDict
      })
      let response = gptResponse.data.choices[0].message
      message.reply(response.content)
      addMessageToDict("ChatGPT", response.role, response.content)
    } catch (err) {
      messageDict = []
      historyDict = []
      console.error(err)
      message.reply("OpenAI error: " + err.response.statusText)
    }
  }
    
}
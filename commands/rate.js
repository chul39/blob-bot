export default {

  name: "rate",

  run: (client, message) => {
    const score = Math.floor(Math.random() * 10) + 1
    let msg = ""
    for (let i = 0; i < score; i++) { msg += "⭐" }
    message.channel.send(`${msg} ${score}/10`)
  }
  
}
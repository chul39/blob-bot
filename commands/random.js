export default {

  name: "random",
  
  run: (client, message, args) => {
    const max = args[0] ? args[0] : 999
    const random =  Math.floor(Math.random() * max)
    const result = random === 0 ? 1 : random
    message.channel.send(`Random! <@${ message.author.id }> rolls a 🎲 ${ result }`)
  }

}
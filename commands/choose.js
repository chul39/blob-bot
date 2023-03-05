export default {

  name: "choose",

  run: (client, message, args) => {

    if (args.length <= 0) {
      message.channel.send(`ช่วยบอกตัวเลือกมาให้ด้วยสิ`)
      return
    }

    message.channel.send(`${ args[Math.floor(Math.random() * args.length)] } ละกัน`)
    
  }
  
}
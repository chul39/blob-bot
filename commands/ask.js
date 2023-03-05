const list = [
  "ก็ไม่รู้สินะ",
  "ขอคิดดูก่อนละกัน",
  "เรื่องนี้เราจะไม่ยุ่ง",
  "ก็รู้คำตอบอยู่แล้วนิ",
  "คิดว่าไม่หรอกนะ",
  "ไม่มีทางหรอก",
  "แน่นอน 1000%",
  "คิดว่างั้นแหละ",
  "ชั่ย! ชั่ย! ชั่ย!"
]

export default {

  name: "ask",

  run: (client, message, args) => {

    if (args.length <= 0) {
      message.channel.send("อยากจะถามอะไรเราหรอ?")
      return
    } 

    message.channel.send(list[Math.floor(Math.random() * 9)])

  }
  
}
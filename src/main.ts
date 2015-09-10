/// <reference path="../typings/tsd.d.ts"/>

import {TelegramTypedBot as Bot, IServerOptions, TelegramEvent} from 'typedgram-bot'

const PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT      // do not choose 443
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN                       // from @botfather
const HOST = process.env.OPENSHIFT_NODEJS_IP || process.env.LOCAL_IP
const DOMAIN = process.env.OPENSHIFT_APP_DNS || process.env.LOCAL_URL   // name-domain.rhcloud.com

const server: IServerOptions = {
    host: HOST,
    port: PORT,
    domain: DOMAIN,
}

const bot = new Bot(TELEGRAM_TOKEN, server);

bot.onInitialization(me => {
    console.log(`
    ------------------------------
    Bot successfully deployed!
    ------------------------------
    Bot info:
    - ID: ${me.id}
    - Name: ${me.first_name}
    - Username: ${me.username}

    Server info:
    - Host: ${server.host}
    - Port: ${server.port}
    - Domain: ${server.domain}
    - Node version: ${process.version}
    ------------------------------
    `)
})

bot.onPlainText(msg => {
    return bot.sendMessage(msg.chat.id, 'Echo: ' + msg.text, {
        reply_to_message_id: msg.message_id,
    })
    .then(sent => {
        return bot.sendMessage(msg.chat.id, 'Type /help.')
    })
})

bot.onMissingCommand(msg => {
    return bot.sendMessage(msg.chat.id, 'Action Not found, type /help.')
})

bot.onCommand(['/hello', '/hi'], msg => {
    return bot.sendMessage(msg.chat.id, 'Hello world')
})

bot.onCommand('/help', msg => {
    return bot.sendMessage(msg.chat.id, 'Tell me what do you need', {
        reply_to_message_id: msg.message_id,
        reply_markup: {
            force_reply: true,
        }
    })
    .then(bot.waitResponse(msg))
    .then(response => {
        return bot.sendMessage(response.chat.id, `I'm sorry Dave, I'm afraid I can't do that`, {
            reply_to_message_id: response.message_id,
        })
    })
    .catch(err => {
        return bot.sendMessage(msg.chat.id, 'Ups! Error:' + err)
    })
})

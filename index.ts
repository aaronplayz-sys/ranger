import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
dotenv.config()

import testSchema from './test-schema'

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
})

client.on('ready', () => {
    console.log('Bot is ready!')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: ['YOUR GUILD ID HERE'],
        botOwners: ['YOUR DISCORD USER ID HERE (ex. 123456789)'],
        mongoUri: process.env.MONGO
    })

    setTimeout(async () => {
        await new testSchema({
            message: 'hello world!!'
        }).save()
    }, 1000)
})

client.login(process.env.TOKEN)

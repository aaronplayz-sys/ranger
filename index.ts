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
        Intents.FLAGS.GUILD_MEMBERS,
    ],
})

client.on('ready', async () => {
    console.log('Bot is ready!')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        featureDir: path.join(__dirname, 'features'),
        typeScript: true,
        testServers: ['523260113054597120'],
        botOwners: ['223962310287294465'],
        mongoUri: process.env.MONGO
    })

    setTimeout(async () => {
        await new testSchema({
            message: 'hello world!!'
        }).save()
    }, 1000)
})

client.login(process.env.TOKEN)
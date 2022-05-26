import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
import WOKCommands from 'wokcommands'
import path from 'path'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('Bot is ready!')

    new WOKCommands(client, {
        commandDir: path.join(__dirname, 'commands'),
        typeScript: true,
        testServers: 'YOUR GUILD ID HERE',
    })
})

client.login(process.env.TOKEN)

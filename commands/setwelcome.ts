import DJS from 'discord.js'
import { ICommand } from "wokcommands";
import welcomeSchema from '../models/welcome-schema';

export default {
    category: 'Configuration',
    description: 'Sets the welcome channel',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',

    slash: true,
    //testOnly: true, 

    options: [
        {
            name: 'channel',
            description: 'The target channel',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.CHANNEL
        },
        {
            name: 'text',
            description: 'The welcome message',
            required: true,
            type: DJS.Constants.ApplicationCommandOptionTypes.STRING
        }
    ],

    callback: async ({ guild, interaction, args }) => {
        if (!guild) {
            return 'Please use this command in a server.'
        }

        const target = interaction.options.getChannel('channel')
        if (!target || target.type !== 'GUILD_TEXT') {
            return 'Please use a text channel.'
        }

        let text = interaction.options.getString('text')

        await welcomeSchema.findOneAndUpdate({
            _id: guild.id
        }, {
            _id: guild.id,
            text,
            channelId: target.id
        }, {
            upsert: true
        })
        
        return 'Welcome channel is set!'
    }
} as ICommand
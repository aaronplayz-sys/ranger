import { TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sends a message.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 2,
    expectedArgs: '<channel> <text>',
    expectedArgsTypes: ['CHANNEL', 'STRING'],

    slash: true,
    //testOnly: true, // remove after testing
    guildOnly: true,

    callback: ({ interaction, args }) => {
        const channel = (interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'This is not a text channel! Please tag a text channel!'
        }

        args.shift() // Removes the channel (e.g  #general)  from the array
        const text = args.join(' ')

        channel.send(text)

        if (interaction) {
            interaction.reply({
                content: 'Message has been sent!',
                ephemeral: true
            })
        }
    }
} as ICommand
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Deletes multiple messages from chat at once',

    permissions: ['ADMINISTRATOR'],
    requireRoles: true,

    maxArgs: 1,
    expectedArgs: '[amount]',

    slash: true,
    //testOnly: true,
    guildOnly: true,

    callback: async ({ interaction, channel, args }) => {
        const amount = args.length ? parseInt(args.shift()!) : 10

        const { size } = await channel.bulkDelete(amount, true)

        const reply = `Deleted ${size} message(s)!`

        if (interaction) {
            return reply
        }
    }
} as ICommand
import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Bans a user from the server.',

    //permissions: ['BAN_MEMBERS'], // uncomment the "//" before permissions if you wish to us discords built in function.
    requireRoles: true,

    slash: true,
    //testOnly: true,

    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],

    callback: ({ interaction, args }) => {
        const target = interaction.options.getMember('user') as GuildMember
        if (!target) {
            return 'Please tag someone for me to ban!'
        }

        if (!target.bannable) {
            return {
                custom: true,
                content: 'Cannot ban that user.',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.ban({
            reason,
            days: 7
        })

        return {
            custom: true,
            content: `You swung the ban hammer on <@${target.id}> aka ${target.displayName}`,
            ephemeral: true
        }
    }
} as ICommand
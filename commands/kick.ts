import { GuildMember } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Moderation',
    description: 'Kicks a user from the server.',

    //permissions: ['KICK_MEMBERS'], // uncomment the "//" before permissions if you wish to us discords built in function.
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
            return 'Please tag someone for me to kick!'
        }

        if (!target.kickable) {
            return {
                custom: true,
                content: 'Cannot kick that user.',
                ephemeral: true
            }
        }

        args.shift()
        const reason = args.join(' ')

        target.kick(reason)

        return {
            custom: true,
            content: `You gave the boot to <@${target.id}> aka ${target.displayName}`,
            ephemeral: true
        }
    }
} as ICommand
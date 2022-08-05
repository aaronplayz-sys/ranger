import { Client, GuildMember, Interaction, MessageActionRow, MessageSelectMenu, MessageSelectOptionData, Role, TextChannel } from "discord.js";
import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Gives a role(s) to the auto role message.',

    permissions: ['ADMINISTRATOR'],

    minArgs: 3,
    maxArgs: 3,
    expectedArgs: '<channel> <messageId> <role>',
    expectedArgsTypes: ['CHANNEL', 'STRING', 'ROLE'],

    slash: true,
    testOnly: true, // Remove after testing
    guildOnly: true,

    init: (client: Client) => {
        client.on('interactionCreate', interaction => {
            if (!interaction.isSelectMenu()) {
                return
            }

            const { customId, values, member } = interaction

            if (customId === 'auto_roles' && member instanceof GuildMember) {
                const component = interaction.component as MessageSelectMenu
                const removed = component.options.filter((option) => {
                    return !values.includes(option.value)
                })

                for (const id of removed) {
                    member.roles.remove(id.value)
                }

                for (const id of values) {
                    member.roles.add(id)
                }

                interaction.reply({
                    content: 'Your roles has been updated!',
                    ephemeral: true
                })
            }
        })
    },

    callback: async ({ interaction, args, client }) => {
        const channel = (interaction.options.getChannel('channel')) as TextChannel
        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'This is not a text channel! Please tag a text channel!'
        }

        const messageId = args[1]

        const role = (interaction.options.getRole('role')) as Role
        if (!role) {
            return 'That role dose not seem to exist, Unknown role!'
        }

        const targetMesage = await channel.messages.fetch(messageId, {
            cache: true,
            force: true
        })

        if (!targetMesage) {
            return 'Could not find the message ID!'
        }

        if (targetMesage.author.id !== client.user?.id) {
            return `Please provide a message ID that was sent from <@${client.user?.id}>`
        }

        let row = targetMesage.components[0] as MessageActionRow
        if (!row) {
            row = new MessageActionRow()
        }

        const option: MessageSelectOptionData[] = [{
            label: role.name,
            value: role.id
        }]

        let menu = row.components[0] as MessageSelectMenu
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu.`,
                        allowedMentions: {
                            roles: []
                        },
                        ephemeral: true
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new MessageSelectMenu()
                .setCustomId('auto_roles')
                .setMinValues(0)
                .setMaxValues(1)
                .setPlaceholder('Select your roles...')
                .addOptions(option)
            )
        }

        targetMesage.edit({
            components: [row]
        })

        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu.`,
            allowedMentions: {
                roles: []
            },
            ephemeral: true,
        }
    },
} as ICommand
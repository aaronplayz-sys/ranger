import { ICommand } from "wokcommands";

export default {
    category: 'Configuration',
    description: 'Sets the bots status',

    minArgs: 1,
    expectedArgs: '<status>',

    slash: true,
    //testOnly: true, // remove after testing

    ownerOnly: true, // Only specified users mentioned in index.ts on line 28 can use this command

    callback: ({ client, text }) => {
        client.user?.setPresence({
            activities: [{
                name: text,
            }],
        })

        return 'Status updated!'
    },
} as ICommand
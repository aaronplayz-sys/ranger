import { ICommand } from "wokcommands";

export default {
    category: 'Test',
    description: 'pong ping',

    slash: 'both',
    testOnly: true,

    callback: ({}) => {
        return 'pong'
    },
} as ICommand
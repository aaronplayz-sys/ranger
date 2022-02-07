const { CommandInteraction } = require("discord.js");

module.exports ={
    name: "ping",
    description: "Displays bot latency... or dose it?",
    permission: "ADMINISTRATOR",
    /**
     * 
     * @param {CommandInteraction} interaction 
     */
    async execute(interaction) {
        interaction.reply({content: "PONG"})
    }
}
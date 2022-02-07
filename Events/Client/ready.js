const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../config.json");
module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        console.log("The Client is now Ready!")
        client.user.setActivity("Hello", {type: "WATCHING"});

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to database")
        }).catch((err) => {
            console.log(err)
        });
    }
}
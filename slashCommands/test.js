const { SlashCommandBuilder} = require('@discordjs/builders')
require ('dotenv').config()
const {Rest,Routes} = require('discordjs')
// module.exports = {
//     data : new SlashCommandBuilder()
//     .setName("test").setDescription('This is the test command'),
//     async execute(interaction,client){
//         await interaction.reply({content:"the bot is working "});
//     }
// }
const commands = [
    {
        name: "hey",
        description:"replay with hi "
    }
]
const rest= new Rest({version:"10"}).setToken(process.env.DISCORD_BOT_ID)
(async()=>{
    try{
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID)
        )
    }catch(error){
        console.log("there error " , error);
    }
})
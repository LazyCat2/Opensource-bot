require('dotenv').config({path: './.env'})
 const
    { GatewayIntentBits, Client, Constants } = require('discord.js'),
    fs = require('fs'),
    //{ createClient } = require('@supabase/supabase-js'),

    bot = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ],
        ws: { 
            properties: {
                    $os: process.platform,
                    $browser: "Discord",
                    $device: "discord.js" 
                }
            }
    });
 commands = {};
module.exports = {bot: botInfo};
if (process.argv.includes('--refresh-slash')) { 
    require('.//.js')
};
interactionTypes = [
    'ping', 'command',
    'component', 'autocomplete',
    'modal'
];
selectMenus = {};
processTime = Date.now();
bot.on('ready', async ()=>{
    await bot.user.setPresence({ activities: [{ name: process.env.status, type: 5 }]});
    runtime = Date.now - processTime;
    console.log(`${bot.user.name} запустился за ${runtime}ms`);
    fs
        .readdirSync('./commands')
        .filter(file=>file!='init.js')
        .forEach(file=>commands[file.replace('.js', '')] = require('./commands/'+file).execute)
});
bot.on('interactionCreate', inter=>{
    commands[inter.commandName](inter)
})

bot.login(process.env.token);

const Discord = require('discord.js')
const bot = new Discord.Client()
const commands = require('./commands')
const servers = require('./data/servers.json')

bot.on("ready", () => console.log(bot.user.tag + " is online"))

bot.on("message", (msg) => {
    if (msg.author.bot || !msg.content.startsWith(process.env.PREFIX)) return

    let cmd = msg.content.split(' ')[0].substring(process.env.PREFIX.length)
    let args = msg.content.split(' ').slice(1)

    if (!cmd) return

    switch (cmd) {
        case 'forums':
            commands.forums.checkSection(bot, msg, args)
            break
        case 'help':
            commands.help.sendHelpMenu(msg, args[0])
            break
        case 'hue':
            commands.hue.sendTestMessage(msg)
            break
        case 'lb':
        case 'leaderboard':
            commands.leaderboard.sendLeaderboard(msg, args)
            break
        case 'pop':
            cmd = 'population' // Removes abbreviation
        case 'population':
        case 'map':
        case 'rank':
            commands.data.sendData(msg, cmd, args[0], args[1])
            break
        case 'on':
        case 'online':
            commands.online.sendOnline(msg, args[0])
            break
        case 'stats':
            commands.stats.sendPlayerStatus(msg, args)
            break
        case 'steam':
        case 'steaminfo':
            commands.steaminfo.sendSteamInfo(msg, args[0])
            break
        default:
            let serverNames = Object.keys(servers)
            
            // server command
            if (serverNames.some(serverName => serverName == cmd)) {
                commands.server.sendServerInfo(msg, cmd)
                break
            }

            // playerh and players command
            let serverNameInCommand = cmd.substr(0, cmd.length - 1)
            if (serverNames.some(serverName => serverName == serverNameInCommand)) {
                if (cmd[cmd.length - 1] == 'h')
                    commands.player.sendPlayerGraph(msg, servers[serverNameInCommand], args[0], args.slice(1), 1)
                else if (cmd[cmd.length - 1] == 's')
                    commands.player.sendPlayerGraph(msg, servers[serverNameInCommand], args[0], args.slice(1), 2)
                break
            }

            // Unknown command
            msg.channel.send(
                new Discord.RichEmbed()
                .setTitle('Unknown command')
                .setDescription('"' + cmd + '" is not a known command.\nType ``' + process.env.PREFIX + 'help`` for a list of commands.')
                .setThumbnail('https://cdn.glitch.com/bcfe2b58-fec3-47dd-9035-1ff2cfe59574%2Fk_confusion.png?v=1561883974127')
                .setColor('DARK_BLUE')
            )
    }
})

bot.login(process.env.TOKEN)
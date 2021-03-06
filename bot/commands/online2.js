const Discord = require('discord.js')
const rp = require('request-promise')
const servers = require('../data/servers.json')
const thumbs = require('../data/thumbnails.json')
const getAvailableServers = require('./help').getAvailableServers
const getGraphURL = require('./data').getGraphURL

async function getOnlinePlayers(serverIP) {
    let onlinePlayers = []

    await rp({
        uri: 'https://status.smithtainment.com/api/json.php',
        qs: {
            type: 'players',
            ip: serverIP,
            key: process.env.SMITHTAINMENT_API_KEY
        },
        json: true
    })
        .then(data => {
            if (!data)
                throw new Error(`No response data from API. IP: \`${serverIP}\`, type: \`players\``)

            onlinePlayers = data
        })

    return onlinePlayers
}

exports.sendOnline = (msg, server) => {
    // Data validation
    if (!server) {
        msg.channel.send(
            new Discord.RichEmbed()
                .setTitle('Missing server')
                .setDescription('You must choose a server!\n**Servers:** ' + getAvailableServers('online').join(', ') + '\nType ``' + process.env.PREFIX + 'help online2`` for more information.')
                .setThumbnail(thumbs.giggle)
                .setColor('RED')
        )
        return
    }
    server = server.toLowerCase() // Removes case sensitivity
    if (!getAvailableServers('online').some(avaliableServer => { return avaliableServer == '``' + server + '``' })) {
        msg.channel.send(
            new Discord.RichEmbed()
                .setTitle('Invalid server')
                .setDescription('\"' + server + '\" is not a valid server!\n**Servers:** ' + getAvailableServers('online').join(', ') + '\nType ``' + process.env.PREFIX + 'help online2`` for more information.')
                .setThumbnail(thumbs.confused)
                .setColor('RED')
        )
        return
    }

    getOnlinePlayers(servers[server].ip)
        .then(onlinePlayers => {
            if (onlinePlayers.length > 0) {
                onlinePlayers = onlinePlayers.sort((a, b) => { return a.Time < b.Time ? 1 : (a.Time > b.Time ? -1 : 0) })
                msg.channel.send(
                    new Discord.RichEmbed()
                        .setDescription(`Showing [${servers[server].name}](https://www.gametracker.com/server_info/${servers[server].ip}) online players. **[Join now!](${process.env.BASEURI}/redirect/${server})**`)
                        .addField('Name', onlinePlayers.map(player => player.Name).join('\n'), true)
                        .addField('Time played', onlinePlayers.map(player => player.TimeF).join('\n'), true)
                        .setColor('GOLD')
                )
            }
            else
                msg.channel.send(
                    new Discord.RichEmbed()
                        .setTitle('No players online')
                        .setDescription(`There are no players online on\n[${servers[server].name}](https://www.gametracker.com/server_info/${servers[server].ip}). **[Join now!](${process.env.BASEURI}/redirect/${server})**`)
                        .setImage(getGraphURL('population', 'day', server))
                        .setColor('GOLD')
                )
        })
        .catch(err => {
            msg.channel.send(
                new Discord.RichEmbed()
                    .setTitle('Error')
                    .setDescription('Something happened while getting the online players.\nPlease ping or open and add <@310491216393404416> to a support ticket if this continues __after some time__. Error:\n```js\n' + (err.toString().length > 250 ? err.toString().substr(0, 250) + ' [...]' : err.toString()) + '\n```')
                    .setThumbnail(thumbs.sad)
                    .setColor('DARK_RED')
            )
        })
}

exports.getOnlinePlayers = getOnlinePlayers
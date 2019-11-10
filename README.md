# SGStats
SGStats is a Discord scraper bot specifically made for the [Smithtainment gaming network](https://forums.smithtainment.com/).
It is partially hard-coded to get information about their game servers and forums.

Along with the Discord bot, this Node.js application also runs a server which serves pages with the changelog and some redirect links directly to the Steam game servers.
You can check the live version of the bot with the updated changelog on [Glitch.com](https://sgstats.glitch.me/).

## Scraped data
Some of the data gathered for the network members includes:
- [gametracker.com](https://www.gametracker.com) data and generated images
- Steam user basic information through [Steam Web API](https://steamcommunity.com/dev)
- [Smithtainment Forums](https://forums.smithtainment.com/) specific posts
- Smithtaiment server info through [Smithtainment Status API v2](https://status.smithtainment.com/api/)

These data are gathered through commands in a Discord server channel, to see which commands are available and what each one does, use the ``help`` command to the bot.

## Installing
Before runnning the bot, install its dependencies and set up the enviroment variables

#### Dependencies
```console
npm i
```

#### Environment Variables
Create a ``.env`` file in the project's root. These variables are needed throughout the code:
```ini
# Server
BASEURI=                       # The url of the server (Ex: http://localhost)
PORT=                          # The server port (Ex: 80)

# Bot
PREFIX=                        # The prefix character for commands (Ex: !!)
TOKEN=                         # The Discord bot app token
STEAMWEBAPI_KEY=               # The Steam Web API key
SMITHTAINMENT_API_KEY=         # The Smithtainment API v2 key
DEBUG_CHANNEL=                 # The Discord channel to send startup and specific error messages
FORUMS_CHECK_MESSAGE_CHANNEL=  # The Discord server channel to send the forums sections logs
FORUMS_CHECK_LOGGING=          # true or false, toggles logging at bot/commands/forums.js

# Scripts
GLITCH_NO_SLEEP=               # true or false, toggles noSleep script for Glitch.com
```

#### Running
```console
node main.js
```

## Gametracker servers
Some commands scrap, format and send Gametracker server information to the users. 
The information needed to access a specific server data on Gamertracker is stored in a JSON file located at
``bot/data/servers.json``. This makes it easier to add and remove servers the bot can target, without having to modify the commands themselves.

Here's how add a new server to the file:
```json
{
    "classic": {
        "name": "Classic PropHunt",
        "ip": "185.249.196.141:27515",
        "gamertrackerID": "6055306",
        "supportedBySmithtainmentAPI": true
    }
}
```
- **Object key** (Ex: ``classic``): The single word abbreviation for the server, used in commands
names and parameters.
- **``name``**: The name of the server, used in embed messages.
- **``ip``**: The ip + port of the server, used to build the target server URLs.
- **``gamertrackerID``**: The server ID generated by Gamertracker, used to build graph images URLs.
- **``supportedBySmithtainmentAPI``**: True if server is supported by the Smithtainemnt API. Only available on Smithtainment Gaming servers.

## Commands
Server commands
- `join`: Generates a link to quickly join a server.
- `map`: Shows a graph of the most used maps in a server over the last day, week or month.
- `online`: Shows a list of the server's online players and their time played since the last join. Also shows a graph of the server's population through the day.
- `online2`: Shows a list of the server's online players. Uses Smithtainment Status API v2.
- `population`: Shows a graph of the population of a server over the last day, week or month.
- `rank`: Shows a graph of the server rank over the last day, week or month.
- `server`: Shows current display name, status, ip and online player count/slots of a server.

Player commands`
- `leaderboard`: Shows a leaderboard around a player displaying total score, time played or score/min.
- `playerh`: Shows a graph of the minutes played each day on a server over the last day, week or month.
- `players`: Shows a graph of the score earned on a server over the last day, week or month.
- `stats`: Shows the leaderboard rank, total score, time played and score/min of a player on a server.

Other commands
- `steaminfo`: Shows some information from steam of a steam user.
### Screenshots
<details>
    <summary>Click to see some screenshots of the above commands response</summary>
    <p>
        <img width="300" src="https://user-images.githubusercontent.com/44736064/68536758-b2bbf080-0336-11ea-9b4c-a8491c36ee09.png">
        <img width="300" src="https://user-images.githubusercontent.com/44736064/68536759-b2bbf080-0336-11ea-9fa4-1e544c229c3a.png">
        <img width="300" src="https://user-images.githubusercontent.com/44736064/68536761-b3548700-0336-11ea-8c4e-31a1f2e7410b.png">
        <img width="300" src="https://user-images.githubusercontent.com/44736064/68536760-b3548700-0336-11ea-85f1-ba2f7aa64662.png">
        <img width="300" src="https://user-images.githubusercontent.com/44736064/68536784-25c56700-0337-11ea-8dda-f19727cb4ed5.png">
    <p>
</details>
  
## Acknowledgments
Thank you Aryan#6666 for helping me get started on Discord bot development.

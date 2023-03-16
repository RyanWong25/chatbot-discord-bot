# chatbot-discord-bot

This is a Discord bot project that uses the [OpenAI completion API](https://platform.openai.com/docs/api-reference/chat/create)
to respond to user input in a Discord server channel.</br>
Followed [this](https://medium.com/sopmac-labs/create-a-chatgpt-discord-bot-8b853c62b08d) Medium tutorial to create this project.</br>
Added a `temperature` parameter to the response to make the output less deterministic and more random.</br>
This project is not currently deployed to a hosting service, to limit usage.

## Running the bot

To get this discord bot up and running, use this command:
```sh
node index.js
```
import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { Configuration, OpenAIApi } from "openai";

// load environment variables from .env file
dotenv.config();

// create a Discord client, specify intents: what types of events the bot will receive from Discord server
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// create OpenAI class to send requests to the API
const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
);

// listen for messageCreate event: triggered when user sends message
client.on("messageCreate", async function (message) {
    // check if message sent by bot -> do nothing
    if (message.author.bot) return;
    
    // Create completion for user message, sends back as a response
    try {
      const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
              {role: "system", content: "You are a helpful assistant who responds succinctly"},
              {role: "user", content: message.content}
          ],
          // temperature between 0 and 2, lower = more deterministic
          temperature: 1.5,
        });
  
      const content = response.data.choices[0].message;
      return message.reply(content);
  
    } catch (err) {
      return message.reply(
        "As an AI robot, I errored out."
      );
    }
  });

// listen for ready event: triggered when bot is connected to Discord server
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
  
    // get the channel object for the channel you want to send the message to
    const channel = client.channels.cache.get(process.env.CHANNEL_ID);
  
    // send a message in the channel to confirm that the bot is up and running
    try {
      await channel.send("Chatbot is up and running!");
    } catch (err) {
      console.error(err);
    }
  });

// Establish connection to Discord server and authenticate bot with token
client.login(process.env.BOT_TOKEN);
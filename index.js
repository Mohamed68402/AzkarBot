require("dotenv").config();

const cron = require("cron");

const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} = require("@discordjs/voice");
const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});
let joined = false;
const sounds = [
  "FirstWorkSound.opus",
  "2.mp3",
  "3.mp3",
  "4.mp3",
  "5.mp3",
  "6.mp3",
  "7.mp3",
  "8.mp3",
];
client.on("ready", () => {
  console.log("bot is ready");
});
function useSound(connection) {
  const soundIndex = Math.floor(Math.random() * sounds.length); // Generate a random index to select a sound file
  const soundUrl = sounds[soundIndex]; // Get the sound file based on the random index
  const player = createAudioPlayer();
  const resource = createAudioResource(soundUrl);
  player.play(resource);
}
function sendMessage(channelId, message) {
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.send(`@everyone ${message}`);
  } else {
    console.error("Invalid channel ID");
  }
}

client.on("messageCreate", async (message) => {
  if (
    message.content.toLowerCase() === "/join" &&
    message.member.voice.channel
  ) {
    try {
      const connection = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator,
        selfDeaf: false, // Set selfDeaf to false to prevent the bot from joining deafened
      });
      console.log(`Joined ${message.member.voice.channel.name}`);
      joined = true;
      if (joined) {
        useSound(connection);
        setInterval(() => {
          useSound(connection);
        }, 5 * 60 * 1000);
      }
    } catch (error) {
      console.error(`Error joining voice channel: ${error}`);
      message.reply("Failed to join voice channel.");
    }
  }
});
const job1 = new cron.CronJob("00 50 21 * * *", () => {
  const channelId = "1137515089482748029"; // Replace with your channel ID
  const message = "إن شاء الله سيعقد مجلس القران بعد 10 دقائق";
  sendMessage(channelId, message);
});
job1.start();
const job2 = new cron.CronJob("00 55 21 * * *", () => {
  const channelId = "1137515089482748029"; // Replace with your channel ID
  const message = "إن شاء الله سيعقد مجلس القران بعد 5 دقائق";
  sendMessage(channelId, message);
});
job2.start();
const job3 = new cron.CronJob("00 00 22 * * *", () => {
  const channelId = "1137515089482748029"; // Replace with your channel ID
  const message = "إن شاء الله سيعقد مجلس القران الان";
  sendMessage(channelId, message);
});
job3.start();
client.login(process.env.DISCORD_BOT_ID);

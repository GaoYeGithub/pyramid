import dotenv from 'dotenv';
import { Client, TextChannel, Message, GatewayIntentBits, ActivityType } from 'discord.js';

import { isValid, genPyramid } from './util';

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.login(process.env.TOKEN);

client.on('ready', () => {
  console.log('Ready!');
  client.user?.setActivity({
    name: 'making sideways pyramids',
    type: ActivityType.Playing
  });
});

client.on('messageCreate', async (msg: Message) => {
  if (!msg.content.startsWith('/pyramid') || msg.author.bot) return;

  const args = msg.content.slice('/pyramid'.length).trim().split(/ +/);
  const size = parseInt(args[0]);
  const toRepeat = args.slice(1).join(' ');

  const valid = isValid(msg);
  if (!valid.isValid) {
    await msg.reply(valid.error || 'Invalid input');
    if (valid.reaction) await msg.react(valid.reaction);
    return;
  }

  const toSend = genPyramid(toRepeat, size);

  try {
    await msg.channel.send(toSend);
  } catch (err) {
    await msg.reply(
      `Nice! It looks like you've successfully hacked the Pyramid! Feel free to pen a pull request :). BTW, the error was: ${err}`
    );
  }
});
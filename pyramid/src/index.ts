import dotenv from 'dotenv';
import { Client, Message, GatewayIntentBits, ActivityType } from 'discord.js';

import { isValid, genPyramid, genCenteredPyramid, genUpsideDownPyramid, genRightPyramid, genRandomPyramid, genGradientPyramid, genEmojiPyramid, genHolidayPyramid } from './util';

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
    name: 'creating unique pyramids',
    type: ActivityType.Playing
  });
});

client.on('messageCreate', async (msg: Message) => {
  if (msg.author.bot) return;

  const [command, ...args] = msg.content.trim().split(/ +/);
  const size = parseInt(args[0]);
  const toRepeat = args.slice(1).join(' ');

  const noRepeatRequiredCommands = ['/random', '/gradient', '/holiday'];

  let valid;

  if (noRepeatRequiredCommands.includes(command)) {
    valid = { isValid: true };
  } else {
    valid = isValid(command, size, toRepeat);
  }

  if (!valid.isValid) {
    await msg.reply(valid.error || 'Invalid input');
    if (valid.reaction) await msg.react(valid.reaction);
    return;
  }

  let toSend = '';
  switch (command) {
    case '/pyramid':
      toSend = genPyramid(toRepeat, size);
      break;
    case '/centered':
      toSend = genCenteredPyramid(toRepeat, size);
      break;
    case '/upside-down':
      toSend = genUpsideDownPyramid(toRepeat, size);
      break;
    case '/right-pyramid':
      toSend = genRightPyramid(toRepeat, size);
      break;
    case '/random':
      toSend = genRandomPyramid(size);
      break;
    case '/gradient':
      toSend = genGradientPyramid(size);
      break;
    case '/emoji':
      toSend = genEmojiPyramid(size, toRepeat);
      break;
    case '/holiday':
      toSend = genHolidayPyramid(size);
      break;
  }

  try {
    await msg.channel.send(toSend);
  } catch (err) {
    await msg.reply(
      `Error generating pyramid: ${err}`
    );
  }
});


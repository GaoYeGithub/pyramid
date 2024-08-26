import { Message } from 'discord.js';

interface ValidCheck {
  isValid: boolean;
  error?: string;
  reaction?: string;
}

const willOverflow = (size: number, toRepeat: string): boolean => {
  return (size + 1) * size * (toRepeat.length + 1) / 2 > 2000;
};

export const isValid = (msg: Message): ValidCheck => {
  const args = msg.content.slice('/pyramid'.length).trim().split(/ +/);
  
  if (args.length < 2) {
    return {
      isValid: false,
      error: 'Invalid command, must have at least 2 arguments!',
      reaction: '🗑️'
    };
  }
  
  const size = parseInt(args[0]);
  const toRepeat = args.slice(1).join(' ');

  if (isNaN(size)) {
    return {
      isValid: false,
      error: 'Invalid number, must be an integer!',
      reaction: '🗑️'
    };
  }

  if (toRepeat.includes('/pyramid')) {
    return {
      isValid: false,
      error: 'Recursiveness is not allowed!',
      reaction: '😡'
    };
  }

  if (toRepeat.includes('͔')) {
    return {
      isValid: false,
      error: "Sorry, but that character doesn't work :(",
      reaction: '😔'
    };
  }

  if (willOverflow(size, toRepeat)) {
    return {
      isValid: false,
      error: 'Whoops! Looks like that exceeds the maximum characters!',
      reaction: '😔'
    };
  }

  return { isValid: true };
};

export const genPyramid = (toRepeat: string, size: number): string => {
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    toSend += `${toRepeat} `.repeat(i).trim() + '\n';
  }
  return toSend;
};
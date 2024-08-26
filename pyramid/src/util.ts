export interface ValidCheck {
  isValid: boolean;
  error?: string;
  reaction?: string;
}

export const isValid = (command: string, size: number, toRepeat: string): ValidCheck => {
  if (isNaN(size) || size <= 0) {
    return {
      isValid: false,
      error: 'Invalid number, must be a positive integer!',
      reaction: '🗑️'
    };
  }

  if (command === '/emoji' && !toRepeat) {
    return {
      isValid: false,
      error: 'You must provide an emoji to repeat!',
      reaction: '😅'
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


const willOverflow = (size: number, toRepeat: string): boolean => {
  return (size + 1) * size * (toRepeat.length + 1) / 2 > 2000;
};

export const genPyramid = (toRepeat: string, size: number): string => {
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    toSend += `${toRepeat} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

export const genCenteredPyramid = (toRepeat: string, size: number): string => {
  let toSend = '';
  const maxWidth = size * (toRepeat.length + 1);
  for (let i = 1; i <= size; i++) {
    const line = `${toRepeat} `.repeat(i).trim();
    const padding = ' '.repeat((maxWidth - line.length) / 2);
    toSend += padding + line + '\n';
  }
  return toSend.trim();
};

export const genUpsideDownPyramid = (toRepeat: string, size: number): string => {
  let toSend = '';
  for (let i = size; i >= 1; i--) {
    toSend += `${toRepeat} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

export const genRightPyramid = (toRepeat: string, size: number): string => {
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    toSend += `${toRepeat} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

export const genRandomPyramid = (size: number): string => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
    toSend += `${randomChar} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

export const genGradientPyramid = (size: number): string => {
  const gradientColors = ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣'];
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    const color = gradientColors[(i - 1) % gradientColors.length];
    toSend += `${color} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

export const genEmojiPyramid = (size: number, emoji: string): string => {
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    toSend += `${emoji} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

export const genHolidayPyramid = (size: number): string => {
  const holidaySymbols = ['🎄', '🎅', '❄️', '🎁', '🦃'];
  let toSend = '';
  for (let i = 1; i <= size; i++) {
    const symbol = holidaySymbols[(i - 1) % holidaySymbols.length];
    toSend += `${symbol} `.repeat(i).trim() + '\n';
  }
  return toSend.trim();
};

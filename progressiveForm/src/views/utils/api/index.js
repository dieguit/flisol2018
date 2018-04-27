export function validate(value) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.8) {
        if (value && value.length > 8 && /^(a|e|i|o|u)/.test(value)) {
          resolve();
        } else {
          reject(new Error(getMessage(value)));
        }
      } else {
        reject(new Error(`Network error`));
      }
    }, randomRange(100, 1000));
  });
}

export function submit(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.5) {
        resolve(data);
        return;
      }

      reject(new Error('BANG! Try again later'));
    }, 2000);
  });
}

function randomRange(x, y) {
  return Math.floor(Math.random() * (y - x) + x);
}

function getMessage(value) {
  if (!value) {
    return "User name can't be empty";
  }
  if (value.length <= 8) {
    return 'User name must be longer than 8 letters';
  }
  return `The user name "${value}" is already taken. Please choose another one`;
}

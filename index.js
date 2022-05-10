import Keyboard from './keyboard.js';
import keys from './script.js';

window.onload = () => {
  // Add textarea
  const textarea = document.createElement('textarea');
  textarea.classList.add('text');
  document.body.append(textarea);

  // Add keyboard container
  const keyboardView = document.createElement('div');
  keyboardView.classList.add('container');
  document.body.append(keyboardView);

  // Create keyboard
  const keyboard = new Keyboard(keys, keyboardView);

  // Buttons are pressed with the cursor or on my pc
  const pressButton = (event) => {
    if (event.target.tagName === 'BUTTON') {
      keyboard.changeState(event.target.dataset.keyCode, event.type);
      textarea.value = keyboard.type(event.target, textarea.value);
    }
  };
  const releaseButton = (event) => {
    const code = (event.target.dataset.keyCode) ? event.target.dataset.keyCode : '';
    keyboard.changeState(code, event.type);
  };

  const pressComputerKey = (event) => {
    event.preventDefault();
    const virtualKey = keyboard.view.querySelector(`[data-key-code="${event.code}"]`);

    if (virtualKey) {
      keyboard.changeState(event.code, event.type);
      if (event.type === 'keydown') textarea.value = keyboard.type(virtualKey, textarea.value);
    }
  };

  // Catch if my buttons are pressed
  keyboardView.addEventListener('mousedown', pressButton);
  document.addEventListener('click', releaseButton);
  document.addEventListener('keydown', pressComputerKey);
  document.addEventListener('keyup', pressComputerKey);

  // Focus on textarea
  textarea.focus();

  // Adding my text after my keyboard
  const myText = document.createElement('p');
  myText.innerHTML = 'ATTENTION! A useful tip: To change the language press fn.<br>This keyboard is written almost accordingly with Mac\'s keys.<br> The code is here: https://github.com/justannakuznetsova/keyboard.';
  document.body.append(myText);
};

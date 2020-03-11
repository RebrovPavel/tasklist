let element = document.createElement('ul');
const selector = document.getElementById('container'); // select container
selector.appendChild(element);

element = document.createElement('INPUT');
element.id = 'input';
selector.appendChild(element); // init input

element = document.createElement('BUTTON');
element.id = 'button';
element.style.cssText = 'height: 21px; width: 173px;';
selector.appendChild(element); // init button
element.textContent = 'Добавить';

function addToList(string) {
  element = document.createElement('li');
  document.querySelector('ul').appendChild(element);
  element.innerText = string;
}

function reloadList(string = false) {
  document.querySelector('ul').innerHTML = ''; // clear ul
  if (localStorage.getItem('tasks') !== null) {
    let buffer = JSON.parse(localStorage.getItem('tasks'));
    if (string && !buffer.includes(string)) {
      buffer = [...buffer, string].sort(); // sort buffer list
      localStorage.setItem('tasks', JSON.stringify(buffer));
    }
    buffer.forEach((e) => addToList(e)); // fill ul
  } else {
    addToList(string);
    localStorage.setItem('tasks', JSON.stringify([string]));
  }
}

reloadList();

function eventFunc() {
  const inputString = document.getElementById('input').value;
  if (inputString) {
    if (inputString === '$clear') {
      // tasks clear command
      document.querySelector('ul').innerHTML = '';
      localStorage.removeItem('tasks');
      document.getElementById('input').value = '';
    } else {
      reloadList(inputString);
      document.getElementById('input').value = '';
    }
  }
}

element = document.getElementById('button');
element.addEventListener('click', eventFunc);

document.addEventListener('keydown', (event) => {
  if (event.isComposing || event.keyCode === 13) {
    eventFunc();
  }
});

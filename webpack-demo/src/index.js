import _ from 'lodash';
import printMe from './print.js';

function component() {
    let element = document.createElement('div');
    element.innerHTML = _.join(['hello', 'webpack'], '-');

    let btn = document.createElement('button');
    btn.innerHTML = "Click me!";
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());
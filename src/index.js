import { sum } from './math.js'
import './app.css';

window.addEventListener('DOMContentLoaded', () => {
    sum(1, 2)
    const el = document.querySelector('#app');
    el.innerHTML = `
        <h2> 1 + 2 = ${sum(1, 2,)}</h1>
    `
})
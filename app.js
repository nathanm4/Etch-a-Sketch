const gDiv = document.querySelector('#grid_container');


for (let i = 1; i < 257; i++) {
    const div = document.createElement('div');
    gDiv.appendChild(div);
}

const hover = document.createElement('div')
gDiv.appendChild(hover);
hover.className = 'hover';

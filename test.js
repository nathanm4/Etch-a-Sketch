let gridSize = 20,
    eraserX = 3,
    eraserY = 3

const eraseNeighbors = (row, col) => {
    for (let i = row - 1, x = i + eraserX; i < x; i++) {
        for (let j = col - 1, y = j + eraserY; j < y; j++) {
            if ((i > 0 && i <= gridSize) && (j > 0  && j <= gridSize)) {
                let neighbor = document.querySelector(`.cell[data-pos="${i}-${j}"]`),
                    neighborBgColor = neighbor.style.backgroundColor.replace(/\s/g, '')

                if (!neighborBgColor || neighborBgColor === 'rgb(256,256,256)')
                    continue;

                neighbor.style.backgroundColor = ''
            }
        }
    }
}

const drawGrid = () => {
    let grid = document.getElementById('grid')
    grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`

    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize; j++) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.setAttribute('data-pos', `${i}-${j}`)
            cell.addEventListener('mouseover', (e) => {
                if (!e.ctrlKey) {
                    if (cell.style.backgroundColor ) {
                        let newColor = cell.style.backgroundColor
                        newColor = newColor.replace(/^rgb\(/g, '').replace(/\)/g, '').split(', ').map(x => parseInt(x*0.8))
                        cell.style.backgroundColor = `rgb(${newColor[0]},${newColor[1]},${newColor[2]})`
                    } else {
                        cell.style.backgroundColor = `rgb(
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)},
              ${Math.floor(Math.random() * 256)})`
                    }
                } else {
                    let pos = e.target.getAttribute('data-pos').split('-').map(x => parseInt(x))
                    eraseNeighbors(...pos)
                }
            })
            grid.appendChild(cell);
        }
    }
}

const clearGrid = () => {
    console.log('Grid cleared!')
    let grid = document.getElementById('grid')
    while (grid.firstChild) {
        grid.removeChild(grid.lastChild)
    }
    drawGrid();
}

// Buttons
let clearBtn = document.getElementById('clear')
let sizeBtn = document.getElementById('size')

clearBtn.addEventListener('click', clearGrid)
sizeBtn.addEventListener('click', () => {
    let sizeInp = document.getElementById('inp-size'),
        newSize = parseInt(sizeInp.value)

    if (newSize < 16) {
        alert('Minimum size of grid is 16')
    } else if (newSize > 100) {
        alert('Maximum size of grid is 100')
    } else {
        gridSize = parseInt(sizeInp.value)
        clearGrid()
    }
})

drawGrid();

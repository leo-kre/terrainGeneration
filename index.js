const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let table = [];
let biomeArray = [];

let lines = [];

const tileSize = 40;
const terrainCount = 10;
const terrainDensity = 3;

const MAP = {
    width: 50,
    height: 50
}

class Biome{
    constructor(index, spread) {
        this.index = index;
        this.spread = spread;
    }
}

const GRASS = new Biome(1, 10);
const LAVA = new Biome(2, 4);
const SNOW = new Biome(3, 2);
const DUNE = new Biome(4, 10);
const WATER = new Biome(5, 20);
const DIRT = new Biome(6, 10);

// biomeArray.push(DIRT);
// biomeArray.push(GRASS);
// biomeArray.push(LAVA);
// biomeArray.push(SNOW);
// biomeArray.push(DUNE);
biomeArray.push(WATER);

function render() {

    canvas.width = MAP.width * tileSize;
    canvas.height = MAP.height * tileSize;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i = 0; i < table.length; i++) {
        for(let j = 0; j < table[i].length; j++) {

            // if(i < 0 || j < 0 || i >= 48 || j >= 48) return;


            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.strokeRect(i * tileSize, j * tileSize, tileSize, tileSize);
            ctx.stroke();

            ctx.fillStyle = "black";
            ctx.fillText(((j - 1) * MAP.width) + j, i * tileSize, j * tileSize - (tileSize / 2));
            switch(table[i][j]) {
                case 0:
                    ctx.fillStyle = "black";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
                case 1:
                    ctx.fillStyle = "#009118";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
                case 2:
                    ctx.fillStyle = "#E52222";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
                case 3:
                    ctx.fillStyle = "white";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
                case 4:
                    ctx.fillStyle = "#D4781C";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
                case 5:
                    ctx.fillStyle = "#0093B0";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
                case 6:
                    ctx.fillStyle = "#542A00";
                    ctx.fillRect(i * tileSize, j * tileSize, tileSize, tileSize);
                    break;
            }
        }
    }

    for(let j = 0; j < lines.length; j++) {
        if(j == 0) {
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#545454";
            ctx.moveTo((lines[0].y * tileSize) + tileSize / 2, (lines[0].x * tileSize) + tileSize / 2);
            ctx.lineTo((lines[1].y * tileSize) + tileSize / 2, (lines[1].x * tileSize) + tileSize / 2);
            ctx.stroke();
        }
        if(j >= 2) {
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#545454";
            ctx.moveTo((lines[j - 1].y * tileSize) + tileSize / 2, (lines[j - 1].x * tileSize) + tileSize / 2);
            ctx.lineTo((lines[j].y * tileSize) + tileSize / 2, (lines[j].x * tileSize) + tileSize / 2);
            ctx.stroke();
        }
        if(j == (lines.length - 1)) {
            ctx.lineWidth = 10;
            ctx.strokeStyle = "#545454";
            ctx.moveTo((lines[j].y * tileSize) + tileSize / 2, (lines[j].x * tileSize) + tileSize / 2);
            ctx.lineTo((lines[0].y * tileSize) + tileSize / 2, (lines[0].x * tileSize) + tileSize / 2);
            ctx.stroke();
        }
    }
}

function growBiome(data) {   
    let arr = [];
    const {x, y, index, spread} = data;
    
    // arr.push({x: x, y: y, index: index});

    let round = 1;

    while (round < 5) {
                let linearDirection = Math.floor(Math.random() * (spread * 0.5) + (spread / 2.5));
                let diagionalDirection = Math.floor(Math.random() * (spread) + (spread / 1.5));

                switch(round) {
                    case 1:
                        //UP
                        arr.push({x: x, y: y + linearDirection, index:index});
                        // arr.push({x: x + Math.floor(diagionalDirection / 2), y: y + Math.floor((linearDirection / 1.5)), index: 2});
                        arr.push({x: x - Math.floor(diagionalDirection / -2), y: y + Math.floor((linearDirection / 2)), index: 2});
                        break;
                    case 2:
                        //RIGHT
                        arr.push({x: x + linearDirection, y: y, index: index});
                        // arr.push({x: x + Math.floor((linearDirection / 3)), y: + Math.floor(diagionalDirection / 0.7), index: 3});
                        arr.push({x: x + Math.floor(diagionalDirection / 2), y: y + Math.floor((linearDirection / -2)), index: 3});
                        break;
                    case 3:
                        //DOWN
                        arr.push({x: x, y: y - linearDirection, index: index});
                        arr.push({x: x - Math.floor(diagionalDirection / 2), y: y - Math.floor((linearDirection / 2)), index: 4});
                        break;
                    case 4:
                        //LEFT
                        arr.push({x: x - linearDirection, y: y, index: index});
                        // arr.push({x: x - Math.floor((linearDirection / 1.8)), y: y + Math.floor(diagionalDirection / 1.5), index: 5});
                        arr.push({x: x + Math.floor(diagionalDirection / -2), y: y - Math.floor((linearDirection / -2)), index: 1});
                        break;
                    }
        round ++;
    }
    
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].x > (MAP.width - 1)) arr[i].x = 49;
        if(arr[i].y > (MAP.height - 1)) arr[i].y = 49;

        if(arr[i].x < 0) arr[i].x = 0;
        if(arr[i].y < 0) arr[i].y = 0;

        lines.push(arr[i]);
    }


    // setTimeout(() => {
    //     ctx.fillStyle = "#645CAA";
    //     ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize)
    // }, 1);
    return arr;
}

function generateTerrain(arr) {
    let biomesToGenerate = [];
    for(let i = 0; i < terrainCount; i++) {
        biomesToGenerate.push(biomeArray[Math.floor(Math.random() * biomeArray.length)]);
    }

    biomesToGenerate.forEach((biome) => {
        // let x = Math.floor(Math.random() * MAP.width);
        // let y = Math.floor(Math.random() * MAP.height);

        let x = 25;
        let y = 25;

        console.log(x, y);

        arr[y][x] = biome.index;
        for(let i = 0; i < terrainDensity; i++) {
            let growth = growBiome({x: x, y: y, index: biome.index, spread: biome.spread});
            growth.forEach((data) => {
                arr[data.y][data.x] = data.index;
            });
        }
    });

    table = arr;

    render();
}

function generateTable() {
    for(let i = 0; i < MAP.height; i++) {
        let row = [];
        for(let j = 0; j < MAP.width; j++) {
            row.push(0);
        }
        table.push(row);
    }
    generateTerrain(table);
}

function genereateGameMap() {
    generateTable();
    return table;
}

console.log(genereateGameMap())

setInterval(() => {
    table = [];
    lines = [];
    generateTable();
}, 1)

document.addEventListener("keypress", (e) => {
    console.log(e);
    switch(e.key.toLowerCase()) {
        case "r":
            table = [];
            lines = [];
            generateTable();
    }
})
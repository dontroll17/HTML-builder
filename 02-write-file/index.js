const readline = require('readline');
const fs = require('fs/promises');
const path = require('path');
const process = require('process');

const filePath = path.join(__dirname + '/text.txt');

const append = async(data) => {
    await fs.appendFile(filePath , data);
} 

const exit = () => {
    console.log('good buy');
    process.exit(1);
}

const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

interface.on('line', async line => {
    if(line === 'exit') {
        exit();
    }
    await append(line + '\n');
});

interface.on('SIGINT', () => {
    exit();
});

const init = async () => {
    console.log('Enter text: ');
    await fs.writeFile(filePath, '')
}

init();
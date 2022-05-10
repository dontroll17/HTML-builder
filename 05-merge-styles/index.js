const fs = require('fs/promises');
const path = require('path');

const pathToStyles = path.join(__dirname + '/styles');
const pathToDist = path.join(__dirname + '/project-dist');

(async() => {
    const files = await fs.readdir(pathToStyles);
    const cssFiles = [];
    for(const file of files) {
        const pathToFile = pathToStyles + '/' + file;
        const check = await fs.stat(pathToFile);
        const fileData = path.parse(pathToFile);
        if(check.isFile() && fileData.ext === '.css') {
            const data = await fs.readFile(pathToFile);
            cssFiles.push(data.toString());
        }
    }
    await fs.writeFile(pathToDist + '/bundle.css', cssFiles.join('\n'));
})();
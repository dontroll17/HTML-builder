const { readdir, stat } = require('fs/promises');
const { parse, join } = require('path');

const pathToDir = join(__dirname + '/secret-folder');

const meta = (dir) => {
    return parse(dir);
}

const readDir = async(dir) => {
    const data = await readdir(dir);
    return data;
}

(async() => {
    try {
       const dataFromDir =  await readDir(pathToDir);
       const arrOfFiles = [];

       for(let i = 0; i < dataFromDir.length; i++) {
           let pathToFile = pathToDir + "/" + dataFromDir[i];

           const check = await stat(pathToFile);
           const metaData = meta(pathToFile);
           if(check.isFile()) {
               arrOfFiles.push(`${metaData.name} - ${metaData.ext} - ${check.size} byte`);
           }
       }

       for(file of arrOfFiles) {
           console.log(file);
       }
    }
    catch(e) {
        console.error(e)
    }
})();

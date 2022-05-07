const { readdir, stat, copyFile, mkdir, unlink } = require('fs/promises');
const path = require('path');

const pathToDir = __dirname + '/files';
const pathToCopy = __dirname + '/files-copy';

const readDir = async(dir) => {
    return await readdir(dir);
}
(async() => {
    try {
        await mkdir(pathToCopy, { recursive: true });
        const checkFiles = await readDir(pathToCopy);
        if(checkFiles.length > 0) {
            for(file of checkFiles) {
               await unlink(pathToCopy + '/' + file);
            }
        }
        const data = await readDir(pathToDir);
        for(let file of data) {
            const pathToFile = pathToDir + '/' + file;
            const pathToCopyFile = pathToCopy + '/' + file;
            const check = await stat(pathToFile);
            if(check.isFile()) {
                await copyFile(pathToFile, pathToCopyFile);
            }
        }
    }
    catch(e) {
        console.error(e);
    }
})();


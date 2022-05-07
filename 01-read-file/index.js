const { createReadStream } = require('fs');
const { join } = require('path');

const pathToFile = join(`${__dirname}/text.txt`);

const readStreamPromise = (fileStream) => {
    const readStream = createReadStream(fileStream);
    const data = [];
    return new Promise((resolve, reject) => {
        readStream.on('data', chunk => data.push(chunk));
        readStream.on('end', () => resolve(data));
        readStream.on('error', err => reject(err));
    });
}

(async() => {
    try {
        const data = await readStreamPromise(pathToFile);
        console.log(data.toString());
    }
    catch(e) {
        console.error(e);
    }
})();
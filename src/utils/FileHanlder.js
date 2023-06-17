const fs = require('fs').promises;


class FileHandler {
    static async readFileAsync(filePath) {
        try {
            const content = await fs.readFile(filePath, 'utf8');

            return content;
        } catch (err) {
            console.error('Error:', err);
        }
    }

    static async writeToFile(file, content) {
        try {
            const jsonData = JSON.stringify(content, null, 2);

            await fs.writeFile(file, jsonData, 'utf8');
        } catch (err) {
            console.error('Error writing to file:', err);
        }

    }

}



module.exports = FileHandler;

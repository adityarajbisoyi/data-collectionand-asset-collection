const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        downloadImage({ url, filename }) {
          return new Promise((resolve, reject) => {
            const protocol = url.startsWith('https') ? https : http;
            const dir = path.join(__dirname, 'cypress', 'downloads', 'assets');
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            const filePath = path.join(dir, filename);
            const file = fs.createWriteStream(filePath);

            protocol.get(url, (response) => {
              response.pipe(file);
              file.on('finish', () => {
                file.close(() => {
                  resolve(`Downloaded ${filename}`);
                });
              });
            }).on('error', (err) => {
              reject(err.message);
            });
          });
        }
      });
    },
  },
};

const { get } = require('https');
const { createWriteStream, existsSync, mkdirSync, readFileSync, writeFileSync } = require('fs');

const ROOT_URL = 'https://adventofcode.com/';

const env = readFileSync('./.env', 'utf-8').trim().split('\n').reduce((map, line) => {
  map[line.slice(0, line.indexOf('=')).trim()] = line.slice(line.indexOf('=') + 1).trim();
  return map;
}, {});

if (!env.YEAR) {
  console.error('No year defined! Set it up the variable YEAR in the file .env');
  process.exit(1);
}
if (!env.SESSION_TOKEN) {
  console.error('No session token defined! Set it up the variable SESSION_TOKEN in the file .env');
  process.exit(2);
}

function download(url, filePath) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { Cookie: `session=${env.SESSION_TOKEN}` }}, res => {
      if (res.statusCode !== 200) {
        reject(Error(`Cannot get '${url}'`))
        return;
      }
      const dlStream = createWriteStream(filePath);
      dlStream.on("finish", () => dlStream.close(resolve));
      res.pipe(dlStream);
    }).on("error", reject);
  });
}

function getPage(url) {
  return new Promise((resolve, reject) => {
    get(url, { headers: { Cookie: `session=${env.SESSION_TOKEN}` }}, res => {
      if (res.statusCode !== 200) {
        reject(Error(`Cannot get '${url}'`))
        return;
      }
      let result = '';
      res.setEncoding('utf-8');
      res.on('data', chunk => result += chunk);
      res.on('end', () => resolve(result));
    }).on("error", reject);
  });
}

const [ , , day ] = process.argv;
if (!day) {
  console.error('No day given! Usage:\n  retrieve ##');
  process.exit(3);
}
if (+day < 1 || day > 25) {
  console.error('Incorrect day! Please use an integer between 1 and 25');
  process.exit(3);
}

const outDir = `./day_${day}`;
if (!existsSync(outDir)) {
  mkdirSync(outDir);
}

const BASE_URL = `${ROOT_URL}${env.YEAR}/day/${day}`;
Promise.all([
  download(BASE_URL + '/input', outDir + '/input.txt'),
  getPage(BASE_URL).then(page => {
    const re = /<article class="day-desc">[\s\S]+?<\/article>/g;
    const readme = (page.match(re) || []).join('')
      .replace(/<pre><code>|<\/code><\/pre>/g, '```\n')
      .replace(/<\/?code>/g,'`')
      .replace(/<\/?em>/g,'**')
      .replace(/<p>/g,'\n')
      .replace(/<\/p>|<\/li>/g,'')
      .replace(/<\/?ul>/g,'')
      .replace(/<li>/g,'* ')
      .replace(/<a .*?href="([^"]+)".*?>([^<]+)<\/a>/g, '[$2]($1)')
      .replace(/ ---<\/h2>/g, '\n')
      .replace(/<\/?article[^>]*>/g, '')
      .replace('<h2 id="part2">---', '\n\n##')
      .replace(/<h2>--- ([^\n]+)/,'# $1\n\n## Part One');
    writeFileSync(outDir + '/readme.md', readme);
  })
]).then(() => {
  console.log('Done!');
});

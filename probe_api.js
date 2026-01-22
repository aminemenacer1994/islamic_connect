const https = require('https');

const url = 'https://api.quran.com/api/v4/verses/by_page/1?words=false&translations=false&fields=text_uthmani';

https.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log(data.substring(0, 500)); 
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});

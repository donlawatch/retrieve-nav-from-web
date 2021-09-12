const axios = require('axios');
const url = 'https://codequiz.azurewebsites.net/';
const args = process.argv.slice(2); //Fund name argument from command line

axios
  .get(url, {
    headers: { Cookie: 'hasCookie=true' },
  })
  .then((res) => res.data)
  .then((data) => {
    const tableRegx = new RegExp(
      `<tr>[^<]*<td[^>]*>[^<]*${args[0]}\\s*</td>[^<]*<td[^>]*>([^<]+)`,
      'g'
    );

    let match = tableRegx.exec(`${data}`);

    if (!match) {
      console.log('Not Found!');
      return;
    }

    console.log(match[1]);
  });

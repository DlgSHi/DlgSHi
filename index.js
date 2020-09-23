// index.js
const Mustache = require('mustache');
const fs = require('fs');
const MUSTACHE_MAIN_DIR = './main.mustache';
/**
  * DATA is the object that contains all
  * the data to be provided to Mustache
  * Notice the "name" and "date" property.
*/
let DATA = {
  name: 'Igor',
  date: new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    timeZone: 'Europe/Warsaw',
  }),
  startDate: "2015/08/01 00:00:00",
  yearsOfExp: function() {
    return Math.abs(Math.round(new Date().getFullYear() - new Date(this.startDate).getFullYear()));
  },
  monthOfExp: function() {
    let diff = Math.abs(Math.round(new Date().getMonth() - new Date(this.startDate).getMonth()));
    return diff == 1 ? `${diff} month` : `${diff} months`
  }
};
/**
  * A - We open 'main.mustache'
  * B - We ask Mustache to render our file with the data
  * C - We create a README.md file with the generated output
  */
function generateReadMe() {
  fs.readFile(MUSTACHE_MAIN_DIR, (err, data) =>  {
    if (err) throw err;
    const output = Mustache.render(data.toString(), DATA);
    fs.writeFileSync('README.md', output);
  });
}
generateReadMe();
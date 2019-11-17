// const fs = require('fs');
const { exec } = require('child_process');
const { redBright, greenBright } = require('chalk').default;
// const formatBadParam = value => typeof value === 'string' ? `'${value}'` : typeof value;
// const DRY_RUN = process.argv[3] === '--dry-run';

const BASE_CMD = './node_modules/.bin/google-closure-compiler';
const targets = [
  // 'lib/langutil.js',
  // 'react-additions/react-additions.js',
  // 'native-additions/native-additions.js',
  'errorStack.playground.js',
];

for (let i = 0; i < targets.length; i++) {
  console.log(`Minifying: ${targets[i]}`);
  // console.log(cyanBright(getMinPathname(targets[i])));
  const cmd = `${BASE_CMD} --js=${targets[i]} --js_output_file=${getMinPathname(targets[i])} --compilation_level=ADVANCED_OPTIMIZATIONS`;
  const onComplete = (err) => {
    if (err) {
      console.log(redBright('ERROR'));
      console.log(redBright(err));
      process.exit(1);
    } else if (i === targets.length - 1) {
      console.log(greenBright('\nAll targets minified!\n'))
    }
  }
  exec(cmd, onComplete);
}

// npx google-closure-compiler --js=my_program.js --js_output_file=out.js

// ./node_modules/.bin/google-closure-compiler








// How to minify
//
// Download closure compiler from the link below
// https://dl.google.com/closure-compiler/compiler-latest.zip
//
// Extract and rename the .jar file to 'compiler.jar'
// Place it in the project root directory
//
// run `npm run minify <path-to-file>`
// The minified file will be saved in the same directory
// Eg: myFolder/foo.js -> myFolder/foo.min.js

// const fs = require('fs');
// // const https = require('https');
// const { red, green, cyan } = require('chalk').default;
// const request = require('request');

// const pathname = process.argv[2];
// const rawCode = fs.readFileSync(pathname, { encoding: 'utf-8' });

// // const newPathname = getMinPathname(pathname);

function getMinPathname(path) {
  let splittedPath = path.includes('/') ? path.split('/') : [path];
  let filename = splittedPath.pop();
  filename = filename.replace(/\.js$/i, '.min.js');
  splittedPath.push(filename);
  return splittedPath.join('/');
}

// request.post('https://closure-compiler.appspot.com/compile?output_info=compiled_code', {
//   headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//   formData: {
//     compilation_level: 'ADVANCED_OPTIMIZATIONS',
//     output_format: 'text',
//     output_info: 'compiled_code',
//     js_code: rawCode,
//     // js_code: 'alert(\'hi\');',
//   }
// }, (err, res) => {
//   if (err) { console.log(red(err)) }
//   console.log(res)
//   // console.log(cyan(res))
// })







// async function doRequest() {
//   const req = https.request({
//     headers: { 'Content-type': 'application/x-www-form-urlencoded' },
//     // headers: { 'Content-type': 'application/json' },
//     hostname: 'closure-compiler.appspot.com',
//     method: 'POST',
//     path: '/compile',
//   }, (res) => {
//     res.on('data', (d) => {
//       console.log(green(d));
//       // return 'ok';
//     })
//   });

//   req.on('error', (e) => {
//     console.log(red(e));
//     // return 'err';
//   });

//   req.write(JSON.stringify({
//     compilation_level: 'ADVANCED_OPTIMIZATIONS',
//     output_format: 'text',
//     output_info: 'compiled_code',
//     js_code: rawCode,
//   }));

//   req.end(() => { console.log('ended'); });

// }

// // let i = 0;
// const resp = doRequest().then(res => {
//   console.log('res:', res);
// });
// console.log('resp:', resp);
// // setInterval(() => {
// //   console.log(`interval #${++i}`)
// // }, 1000);

// // async function waitRequest() {
// //   const resp = await doRequest();
// //   console.log('resp:', resp);
// // }

// // waitRequest();

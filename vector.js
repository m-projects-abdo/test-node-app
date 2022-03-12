const [,, ...args] = process.argv;
const { exec } = require("child_process");

if(args[0] == 'migrate') {
  exec(`node src/data/table-rollback/${args[1]}`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`created successfully: ${stdout}`);
  });
} 
else if(args[0] == 'test') {
  exec('node test.js', (err, res)=> {
    if(err) {
      console.log(err);
    }
    if(res) {
      console.log(res);
    }
  });
}
else {
  console.error('wrong command.');
}

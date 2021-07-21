const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const os = require('os');



const PHP_VERSION = core.getInput('php_version');
const PHP_EXTENSIONS = core.getInput('extensions');


async function main() {
  core.logger.info('Starting 👌');
}

try {

  // Check if PHP is installed
  if (!core.fileExists(`/usr/bin/php${PHP_VERSION}`)) {
  // Install PHP
    core.logger.info('Installing PHP');
    exec.execSync(`apt-get install -y php${PHP_VERSION}`);
  }

  //Install Composer 
  if (!core.fileExists('/usr/local/bin/composer')) {
    exec.execSync('curl -sS https://getcomposer.org/installer | php');
    exec.execSync('mv composer.phar /usr/local/bin/composer');
  }

  



  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

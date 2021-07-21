const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const os = require('os');


async function run() {
  core.logger.info('Starting 👌..');

  const php_version = await core.getInput('php_version');
  core.logger.info(`Installing ${php_version}`);

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
}

run()
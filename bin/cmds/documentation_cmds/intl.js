/* eslint-disable */
const path = require('path');
const async = require('async');

const emptyLink = (lang, isPrivate) => isPrivate ? `*empty* ([edit now](${pkg.bugs.url.split('/issues')[0]}/edit/dev/translate/${lang}.json))` : `*empty*`;
require('shelljs/global');

exports.command = 'intl';
exports.desc = 'Create internationalization documentation.';
exports.builder = (yargs) => yargs
  .option('path', {
    alias: 'p',
    describe: 'path',
    default: process.cwd(),
  });
exports.handler = (argv) => {
  switch (argv.path[0]) {
    case '/':
      break;
    default:
      argv.path = argv.path[1] === '/' ? path.join(process.cwd(), argv.path.slice(2)) : path.join(process.cwd(), argv.path);
      break;
  }
  const pkg = require(path.join(argv.path, 'package.json'));


  if (!pkg.dependencies['react-intl']) {
    console.log('[Error] - You must use a intl declination to use this command!');
    return;
  }
  const gitlabCiPath = path.join(argv.path, '.gitlab-ci.yml');
  const configPath = path.join(argv.path, 'styleguide/styleguide.config.json');
  const config = require(configPath);

  if (!pkg.translation) {
    throw new Error('You must run intl install first. (eg: intl install en fr de --default=en');
  }

  const readmeList = [];
  let start = '**Import translation**\n\n';
  start += `\`\`\`js static
import englishMessages from '$PACKAGE_NAME/translate/en.json';
\`\`\``;
  start += `\n\n> Locales can be configured within your \`package.json\` under \`translation\` or using \`npm run rollup-umd -- intl install\` command.`;
  start += '\n';

  async.auto({
    runExtract: (cb) => spawn(`npm run rollup-umd -- intl extract`, cb),
    isPrivate: (cb) => spawn(`npm run rollup-umd -- publish status | tail -1`, cb),
    setupCi: (cb) => exec(`grep -q "npm run rollup-umd -- doc intl" ${gitlabCiPath} || echo true`, (err, res) => {
      if (res && res.indexOf('true') !== -1) {
        sedReplace(gitlabCiPath, '# !Replace variables', '# !Replace variables\n    - npm run rollup-umd -- doc intl', gitlabCiPath, cb);
        return;
      }
      cb();
    }),
    makeDoc: ['runExtract', 'isPrivate', 'setupCi', (res, cb) => {
      const isPrivate = !(res.isPrivate[0].split('tail')[1].indexOf('private') === -1);
      pkg.translation.locales.forEach((locale) => {
        const translationPath = path.join(__base, 'translation', `${locale}.json`);
        if (fs.existsSync(translationPath)) {
          const messages = require(translationPath);
          let readme = '\n';
          readme += pkg.translation.locale === locale ? `## ${locale} (default)` : `## ${locale}`;
          readme += '\n\n';
          readme += `| id | defaultMessage |`;
          readme += '\n';
          readme += `|----|----------------|`;
          readme += '\n';
          Object.keys(messages).forEach((key) => {
            readme += `| \`${key}\` | ${messages[key] ? `\`${messages[key]}\`` : emptyLink(locale, isPrivate)} |`;
            readme += '\n';
          });
          readme += '\n';
          readmeList.push({ locale, readme })
        }
      });
      let final = start;
      readmeList.forEach((readme) => {
        final += readme.readme;
      });

      final += '*This file is automatically generated. Do not edit.*';
      final += '\n';

      fs.writeFileSync(path.join(__base, 'docs/translation.md'), final, 'utf-8');

      const intlDocSection = config.sections.filter((section) => section.name === 'Translation')[0];
      if (!intlDocSection) {
        let faqInd = 0;
        config.sections.filter((section, i) => {
          if (section.name === 'FAQ') {
            faqInd = i;
          }
        });
        config.sections = config.sections.slice(0, faqInd)
          .concat([{ name: 'Translation', content: 'docs/translation.md' }])
          .concat(config.sections.slice(faqInd));

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), { encoding: 'utf8' });
      }


      console.log(`${path.join(__base, 'docs/translation.md')} has been updated`);
    }]
  }, (err, res) => {
    if (err) {
      console.error(`[ERROR] ${err.message}`);
      process.exit(1);
    }
    console.log('[Success] Internationalization documentation generated.');
  });
};

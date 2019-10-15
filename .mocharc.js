module.exports = {
  diff: true,
  extension: ['js'],
  opts: false,
  package: './package.json',
  reporter: 'spec',
  slow: 100,
  timeout: 2000,
  ui: 'bdd',
  'watch-files': ['./**/*.spec.js'],
  pattern: ['./**/*.spec.js'],
};

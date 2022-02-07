// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require('next-transpile-modules')(['shared']);

module.exports = withTM({
  eslint: {
    ignoreDuringBuilds: true,
  },
  distDir: '../../dist/.next',
});

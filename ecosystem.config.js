module.exports = {
  apps: [
    {
      name: 'next app',
      exec_mode: 'cluster',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
    },
  ],
};

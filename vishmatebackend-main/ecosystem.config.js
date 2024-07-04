require('dotenv').config();
module.exports = {
  apps: [
    {
      name: 'vishmatebackend',
      script: './server.js', // Path to your main application file
      instances: 1, // Number of instances to run, or 'max' to use all available CPU cores
      autorestart: true, // Restart the application if it crashes
      watch: false, // Enable or disable file watching for changes
      max_memory_restart: '1G', // Restart if the total memory exceeds this value
      env: {
        NODE_ENV: 'production',
        PORT: process.env.PORT, // Set your application's port
      },
    },
  ],

  // deploy: {
  //   production: {
  //     user: 'your-ssh-username',
  //     host: 'your-server-ip',
  //     ref: 'origin/master', // Git branch or tag to deploy
  //     repo: 'git@github.com:your/repo.git',
  //     path: '/path/to/your/app',
  //     'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
  //   },
  // },
};

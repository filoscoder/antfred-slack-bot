module.exports = {
  apps: [
    {
      name: "antfred-slack-bot",
      script: "dist/index.js",
      // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
      exec_mode: "cluster",
      instances: "max",
      kill_timeout: 5000,
      watch: true,
      watch_options: {
        followSymlinks: false,
      },
      max_memory_restart: "1G",
      merge_logs: true,
      log_date_format: "YYYY-MM-DDTHH:mm:ss.sssZ",
      autorestart: true,
      max_restarts: 10,
      env_production: {
        NODE_ENV: process.env.NODE_ENV,
      },
    },
  ],
};

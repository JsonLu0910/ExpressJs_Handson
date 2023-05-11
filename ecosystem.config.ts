module.exports = {
    apps: [
      {
        name: 'express',
        script: './src/Routes/app.ts',
        watch: true,
        interpreter: 'pm2-interpreter',
      interpreter_args: '--interpreter=ts-node-transpile-only',
        ignore_watch: ['node_modules', 'logs'],
        env: {
          NODE_ENV: 'development',
          PORT: 3000,
        },
        env_production: {
          NODE_ENV: 'production',
          PORT: 3030,
        },
        error_file: './logs/error.log',
        out_file: './logs/out.log',
        log_file: './logs/combined.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
      },
    ],
  };
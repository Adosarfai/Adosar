module.exports = {
	apps: [
		{
			name: `adosar website`,
			script: 'serve',
			env: {
				PM2_SERVE_PATH: './dist',
				PM2_SERVE_PORT: 5173,
				PM2_SERVE_SPA: 'true',
				NODE_ENV: 'production',
			},
		},
	],
};

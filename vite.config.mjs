import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const API_URL = `${env.VITE_APP_BASE_NAME}`; // Make sure this is set correctly in Render
  const PORT = env.PORT || '3000'; // Use the PORT environment variable or default to 3000

  return {
    server: {
      open: true,
      port: PORT, // Use the PORT variable assigned by Render
      host: '0.0.0.0', // Bind to all interfaces
      strictPort: true, // Fail if the port is already in use
    },
    define: {
      global: 'window',
    },
    resolve: {
      alias: [],
    },
    css: {
      preprocessorOptions: {
        scss: { charset: false },
        less: { charset: false },
      },
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
    base: API_URL.startsWith('/') ? API_URL : `/${API_URL}`, // Ensure base starts with a slash
    plugins: [react(), jsconfigPaths()],
  };
});

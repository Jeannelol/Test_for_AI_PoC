import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const USE_MOCK_API = process.env.USE_MOCK_API !== 'false';

function mockApiPlugin() {
  const conversations = [
    { id: '1', title: '恒生指数走势分析', summary: '讨论近期恒指波动原因及未来趋势预测', time: '2023-11-15 14:30', updatedAt: Date.now() - 1000 },
    { id: '2', title: '腾讯控股财报解读', summary: '深度解析腾讯最新季度财务表现', time: '2023-11-14 10:15', updatedAt: Date.now() - 2000 },
    { id: '3', title: '新能源板块机会', summary: '探讨港股新能源行业投资机遇', time: '2023-11-12 16:45', updatedAt: Date.now() - 3000 },
    { id: '4', title: '美联储政策影响分析', summary: '分析美国货币政策对港股市场的影响', time: '2023-11-10 09:20', updatedAt: Date.now() - 4000 }
  ];

  const messages: Record<string, Array<{ id: string; content: string; sender: 'user' | 'assistant'; time: string }>> = {
    '1': [
      {
        id: 'm1',
        content: '您好！我是您的港股市场信息助手，有什么可以帮助您的吗？',
        sender: 'assistant',
        time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
      }
    ]
  };

  return {
    name: 'mock-api',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith('/api')) return next();

        const url = new URL(req.url, 'http://localhost');
        res.setHeader('Content-Type', 'application/json');

        if (req.method === 'GET' && url.pathname === '/api/conversations') {
          res.end(JSON.stringify(conversations));
          return;
        }

        const convoMatch = url.pathname.match(/^\/api\/conversations\/([^/]+)\/messages$/);
        if (req.method === 'GET' && convoMatch) {
          const id = convoMatch[1];
          res.end(JSON.stringify(messages[id] || []));
          return;
        }

        if (req.method === 'POST' && convoMatch) {
          const id = convoMatch[1];
          let body = '';
          req.on('data', chunk => (body += chunk));
          req.on('end', () => {
            try {
              const parsed = body ? JSON.parse(body.toString()) : {};
              const now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
              const msg = {
                id: Date.now().toString(),
                content: parsed.content || '',
                sender: 'user' as const,
                time: now
              };
              messages[id] = messages[id] || [];
              messages[id].push(msg);
              res.end(JSON.stringify(msg));
            } catch (err) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), USE_MOCK_API && mockApiPlugin()].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  }
});

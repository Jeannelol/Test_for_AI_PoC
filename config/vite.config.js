import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var USE_MOCK_API = process.env.USE_MOCK_API !== 'false';
function mockApiPlugin() {
    var conversations = [
        { id: '1', title: '恒生指数走势分析', summary: '讨论近期恒指波动原因及未来趋势预测', time: '2023-11-15 14:30', updatedAt: Date.now() - 1000 },
        { id: '2', title: '腾讯控股财报解读', summary: '深度解析腾讯最新季度财务表现', time: '2023-11-14 10:15', updatedAt: Date.now() - 2000 },
        { id: '3', title: '新能源板块机会', summary: '探讨港股新能源行业投资机遇', time: '2023-11-12 16:45', updatedAt: Date.now() - 3000 },
        { id: '4', title: '美联储政策影响分析', summary: '分析美国货币政策对港股市场的影响', time: '2023-11-10 09:20', updatedAt: Date.now() - 4000 }
    ];
    var messages = {
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
        configureServer: function (server) {
            server.middlewares.use(function (req, res, next) {
                if (!req.url || !req.url.startsWith('/api'))
                    return next();
                var url = new URL(req.url, 'http://localhost');
                res.setHeader('Content-Type', 'application/json');
                if (req.method === 'GET' && url.pathname === '/api/conversations') {
                    res.end(JSON.stringify(conversations));
                    return;
                }
                var convoMatch = url.pathname.match(/^\/api\/conversations\/([^/]+)\/messages$/);
                if (req.method === 'GET' && convoMatch) {
                    var id = convoMatch[1];
                    res.end(JSON.stringify(messages[id] || []));
                    return;
                }
                if (req.method === 'POST' && convoMatch) {
                    var id_1 = convoMatch[1];
                    var body_1 = '';
                    req.on('data', function (chunk) { return (body_1 += chunk); });
                    req.on('end', function () {
                        try {
                            var parsed = body_1 ? JSON.parse(body_1.toString()) : {};
                            var now = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
                            var msg = {
                                id: Date.now().toString(),
                                content: parsed.content || '',
                                sender: 'user',
                                time: now
                            };
                            messages[id_1] = messages[id_1] || [];
                            messages[id_1].push(msg);
                            res.end(JSON.stringify(msg));
                        }
                        catch (err) {
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

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Render sẽ cấp cổng ngẫu nhiên qua process.env.PORT, nếu không có thì mặc định chạy 3000
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`JSON Server đang chạy online tại cổng: ${port}`);
});
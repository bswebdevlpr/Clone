const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://clone-h1vkmrwaw-bswebdevlpr.vercel.app",
      changeOrigin: true,
    })
  );
};

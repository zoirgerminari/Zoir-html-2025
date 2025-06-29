const express = require('express');
const httpProxy = require('http-proxy-middleware').createProxyMiddleware;

const app = express();

// Altere esse IP para o da sua ESP32-CAM na rede local
const esp32IP = 'http://192.168.1.89';

app.use('/', httpProxy({ target: esp32IP, changeOrigin: true }));

// Altere a porta aqui, se necessário
app.listen(8000, () => {
  console.log('Proxy ativo em http://localhost:8000');
});
import Fastify from "fastify";

/**
 * Инициализация Fastify API сервера
 * 
 * На этом этапе MVP — только инфраструктура:
 * - health-check эндпоинт
 * - готовность к валидации initData (позже)
 */

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
});

const PORT = parseInt(process.env.PORT || "3001", 10);
const HOST = process.env.HOST || "localhost";

/**
 * Health-check эндпоинт
 * GET /health
 */
server.get("/health", async (request, reply) => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
});

/**
 * Обработка ошибок
 */
server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  reply.status(500).send({
    error: "Internal Server Error",
  });
});

/**
 * Запуск сервера
 */
async function main() {
  try {
    console.log("🚀 Запуск API сервера...");
    await server.listen({ port: PORT, host: HOST });
    console.log(`✅ API запущен на http://${HOST}:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();

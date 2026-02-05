import { Bot } from "grammy";

/**
 * Инициализация Telegram бота
 *s
 * На этом этапе MVP — минимальный функционал:
 * - /start команда
 * - открытие Web App
 */

// Получаем токен из переменной окружения
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN не установлен. Установите переменную окружения.");
}

const bot = new Bot(BOT_TOKEN);

/**
 * Обработчик команды /start
 * Отправляет кнопку для открытия Mini App
 */
bot.command("start", async (ctx) => {
  await ctx.reply("Добро пожаловать в Futsal Mini App! 🎮", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Открыть игру",
            web_app: {
              url: process.env.WEB_APP_URL || "https://example.com",
            },
          },
        ],
      ],
    },
  });
});

/**
 * Команда /health
 * Делает запрос к API `${API_BASE_URL}/health` и возвращает краткий статус пользователю
 */
bot.command("health", async (ctx) => {
  const apiBase = process.env.API_BASE_URL;
  if (!apiBase) {
    console.error("API_BASE_URL не установлен в окружении");
    await ctx.reply("API is unavailable, try later");
    return;
  }

  const url = `${apiBase.replace(/\/$/, "")}/health`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);

  try {
    const res = await fetch(url, { signal: controller.signal });

    if (!res.ok) {
      console.error(`Health request failed: ${res.status} ${res.statusText}`);
      await ctx.reply("API is unavailable, try later");
      return;
    }

    const data = (await res.json()) as unknown;

    // Проверка структуры ответа
    if (
      typeof data === "object" &&
      data !== null &&
      "status" in data &&
      "timestamp" in data &&
      typeof (data as any).status === "string" &&
      typeof (data as any).timestamp === "string"
    ) {
      const status = (data as { status: string }).status;
      const timestamp = (data as { timestamp: string }).timestamp;
      await ctx.reply(`API status: ${status}\ntimestamp: ${timestamp}`);
      return;
    }

    console.error("Invalid /health response shape:", data);
    await ctx.reply("API is unavailable, try later");
  } catch (err) {
    // В случае таймаута/отмены/сети
    console.error("Error fetching API /health:", err);
    await ctx.reply("API is unavailable, try later");
  } finally {
    clearTimeout(timeout);
  }
});

/**
 * Обработчик ошибок
 */
bot.catch((err) => {
  console.error("Ошибка в боте:", err);
});

/**
 * Запуск бота
 */
async function main() {
  console.log("🤖 Запуск Telegram бота...");
  await bot.start();
  console.log("✅ Бот запущен и слушает обновления");
}

main().catch((err) => {
  console.error("Критическая ошибка:", err);
  process.exit(1);
});

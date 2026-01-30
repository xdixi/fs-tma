import { Bot } from "grammy";

/**
 * Инициализация Telegram бота
 * 
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

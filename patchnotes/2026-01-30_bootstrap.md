# PATCH NOTES — v0.0.0 Bootstrap

## Дата
2026-01-30

## Описание
Полная инициализация монорепы проекта Futsal Mini App. Создана инфраструктурная основа для разработки, без реализации бизнес-логики.

## Что изменилось

### Структура репозитория
- Инициализирован pnpm monorepo с workspace конфигурацией
- Создана иерархия: корень → apps/bot, apps/api, apps/web

### Корень репозитория
- `package.json` с dev-скриптами (dev, dev:bot, dev:api, dev:web, build, type-check)
- `pnpm-workspace.yaml` с конфигурацией workspaces
- `.gitignore` с исключением node_modules, dist, .env и IDE файлов
- `README.md` с быстрым стартом
- `.env.example` с шаблоном переменных окружения

### apps/bot (Telegram Bot)
- grammY v1.28.0 как фреймворк для бота
- TypeScript конфигурация (strict mode)
- Команда `/start` с кнопкой открытия Web App (заглушка)
- Обработка ошибок
- Dev-скрипт с tsx для быстрого развития
- Build-скрипт для TypeScript компиляции

### apps/api (Fastify Backend)
- Fastify v4.25.2 как REST API фреймворк
- GET `/health` endpoint для проверки состояния сервера
- Полная типизация на TypeScript (strict mode)
- Логирование встроено в Fastify
- Dev-скрипт с tsx для быстрого развития
- Готовность к валидации initData (позже)

### apps/web (React + Vite Mini App)
- React 18.2.0 + React DOM
- Vite 5 как build tool (холодный старт ~50-100ms)
- @twa-dev/sdk 8.0.2 для работы с Telegram WebApp SDK
- Правильная инициализация: `WebApp.ready()` при монтировании
- Базовый UI: статус инициализации, placeholder экран
- CSS с переменными (--color-*) для переиспользования
- TypeScript с строгой типизацией
- Dev-сервер на порту 5173

## Как использовать

1. **Установка зависимостей:**
   ```bash
   pnpm install
   ```

2. **Создать `.env` из `.env.example` и заполнить токены:**
   ```bash
   cp .env.example .env
   # заполнить BOT_TOKEN и WEB_APP_URL
   ```

3. **Запустить в dev-режиме:**
   ```bash
   # Все приложения
   pnpm dev

   # Или отдельно
   pnpm dev:bot   # слушает обновления Telegram
   pnpm dev:api   # запускает API на localhost:3001
   pnpm dev:web   # запускает Web на localhost:5173
   ```

4. **Type-check:**
   ```bash
   pnpm type-check
   ```

5. **Build:**
   ```bash
   pnpm build
   ```

## Риски и ограничения

- **BOT_TOKEN не установлен** — при dev-запуске бота нужен валидный токен от @BotFather
- **WEB_APP_URL** — при локальной разработке Mini App запускается на localhost, в Telegram нужно указать real URL (можно использовать ngrok)
- **Типизация WebApp SDK** — @twa-dev/sdk имеет базовые типы, при необходимости дополнить

## Проверка качества

✅ Монорепа инициализирована правильно (pnpm.lock будет создан после `pnpm install`)
✅ Все три приложения имеют tsconfig.json и strict mode
✅ Dev-скрипты используют tsx для быстрого запуска TypeScript
✅ Нет бизнес-логики — только инфра
✅ Всё готово к следующему тикету (разработка компонентов, авторизация и т.д.)

## Следующие шаги

1. Запустить `pnpm install`
2. Заполнить `.env` реальными значениями
3. Запустить `pnpm dev` и проверить все три приложения
4. После проверки — first commit + ready for sprint

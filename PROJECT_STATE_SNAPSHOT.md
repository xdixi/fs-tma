# PROJECT STATE SNAPSHOT — fs-tma (v0.0.0)

**Дата создания:** 30 января 2026
**Статус:** Bootstrap завершён, готово к разработке бизнес-логики
**Ветка:** main
**Последний коммит:** d86a0dd (tag: v0.0.0) — "chore: Initial commit — bootstrap monorepo (bot/api/web)"

---

## 1. Общая информация

**Название:** tg-futsal-mini-app (репозиторий: xdixi/fs-tma)

**Назначение:** Telegram Mini App для локальной любительской лиги футзала. Продукт — это игра прогнозов с виртуальной валютой (без реальных денег), где пользователи делают ставки на исходы матчей и участвуют в рейтингах по балансу. Основная ценность: азарт, статус в комьюнити, регулярное взаимодействие.

**Текущий этап:** Bootstrap инфраструктуры — монорепа инициализирована, все три приложения (bot/api/web) содержат минимальный рабочий код с заглушками (no business logic), готовы к разработке.

---

## 2. Структура репозитория

```
tg_bot_futsal/
├── .github/
│   └── copilot-instructions.md        # Инструкции для Copilot (роль, стек, workflow, git flow)
├── .gitignore                          # Исключения: node_modules, dist, .env, IDE файлы
├── .env.example                        # Шаблон переменных окружения
├── package.json                        # Корень монорепы (pnpm workspaces)
├── pnpm-workspace.yaml                 # Конфигурация workspaces (apps/*)
├── pnpm-lock.yaml                      # Locked зависимости (генерируется при install)
├── README.md                           # Быстрый старт + ссылки на спеки
│
├── apps/
│   ├── bot/                            # Telegram Bot (grammY)
│   │   ├── package.json
│   │   ├── tsconfig.json               # TypeScript strict mode
│   │   └── src/
│   │       └── index.ts                # Точка входа: инициализация бота + /start команда
│   │
│   ├── api/                            # Backend API (Fastify)
│   │   ├── package.json
│   │   ├── tsconfig.json               # TypeScript strict mode
│   │   └── src/
│   │       └── index.ts                # Точка входа: инициализация сервера + GET /health
│   │
│   └── web/                            # Telegram Mini App (React + Vite)
│       ├── package.json
│       ├── tsconfig.json               # Vite + React конфигурация
│       ├── tsconfig.node.json
│       ├── vite.config.ts              # Vite конфигурация (port 5173)
│       ├── index.html                  # Entry point для браузера
│       └── src/
│           ├── main.tsx                # React mount point
│           ├── App.tsx                 # Компонент приложения с инициализацией WebApp
│           └── main.css                # Базовые стили
│
├── docs/                               # Проектная документация
│   ├── product-spec.md                 # Спецификация продукта (игровая модель, MVP гейты)
│   └── tech-stack.md                   # Описание технического стека и структуры
│
└── patchnotes/                         # Changelog по датам и task slug'ам
    ├── _template.md                    # Шаблон для новых patchnotes
    └── 2026-01-30_bootstrap.md         # Initial bootstrap — структура проекта, инструкции

```

**Назначение ключевых директорий:**

- `.github/copilot-instructions.md` — "источник правды" для разработки: роль, MVP-гейты, security rules, git workflow, определение done
- `apps/bot|api|web` — три независимых приложения в единой монорепе, управляются через pnpm workspaces
- `docs/` — продуктовые и технические спецификации (обязательна перед любой задачей)
- `patchnotes/` — документация изменений (обязательна при изменении поведения/API/структуры)

---

## 3. Технологический стек (фактический)

### Runtime и инструменты

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0 (менеджер пакетов для монорепы)
- **TypeScript** 5.3.3 (strict mode везде, без `any` по умолчанию)
- **Git** + GitHub (https://github.com/xdixi/fs-tma)

### Bot (apps/bot)

- **Фреймворк:** grammY 1.28.0 (легковесный фреймворк для Telegram Bot API)
- **Язык:** TypeScript + Node.js (ES2020 module, strict)
- **Dev runner:** tsx (быстрый запуск TS без предварительной компиляции)
- **Возможности (placeholder):**
  - `/start` команда с кнопкой открытия Web App
  - Базовая обработка ошибок

### API (apps/api)

- **Фреймворк:** Fastify 4.25.2 (быстрый HTTP-сервер с встроенным логированием)
- **Язык:** TypeScript + Node.js (ES2020 module, strict)
- **Dev runner:** tsx
- **Возможности (placeholder):**
  - GET `/health` — проверка состояния сервера (возвращает `{status: "ok", timestamp}`)
  - Встроенное логирование (pino)
  - Готовность к валидации initData (позже)

### Web (apps/web)

- **Фреймворк:** React 18.2.0 + React DOM
- **Build tool:** Vite 5.0.8 (холодный старт < 100ms, HMR в dev)
- **Язык:** TypeScript (JSX, strict mode)
- **SDK:** @twa-dev/sdk 8.0.2 (доступ к Telegram.WebApp, инициализация Mini App)
- **Стили:** CSS modules (локальный main.css с CSS-переменными)
- **Возможности (placeholder):**
  - Инициализация WebApp.ready() при монтировании
  - Чтение initDataUnsafe для отладки (не источник правды)
  - Базовый UI: статус инициализации, placeholder экран

### Намеренно отсутствующие компоненты (MVP-гейт)

- **База данных** (SQL/NoSQL) — отложено на post-MVP фазу
- **Аутентификация** (JWT, sessions) — на post-MVP
- **Платежи, финансовые операции** — навсегда запрещено (no real money)
- **Микросервисы, DDD, CQRS** — избыточно для MVP, только если явно нужно

---

## 4. Git workflow (как реализован)

### Ветвление

- **Основная ветка:** main (защищена от прямых изменений)
- **Feature-ветки:** format `feature/<short-slug>`, `fix/...`, `chore/...`
- **Пример:** `feature/0.0.1-open-mini-app`

### Коммиты

- Формат: `feat: ...`, `fix: ...`, `chore: ...`, `docs: ...`
- Маленькие, осмысленные куски
- Без .env, токенов, секретов

### Версионирование

- Теги семантические: `v0.0.0`, `v0.0.1`, `v0.1.0` и т.д.
- Текущий релиз: **v0.0.0** (bootstrap milestone)
- Тег привязан к коммиту на main

### Patchnotes (обязательны при изменениях)

- Путь: `/patchnotes/YYYY-MM-DD_<short-slug>.md`
- Содержит: Summary, Scope (bot/api/web), Architecture, How to run, How to verify, Breaking changes/risks, Rollback
- Используется как source of truth при review и onboarding

### PR процесс

1. `git checkout main && git pull --rebase origin main`
2. Создать feature-ветку
3. Коммиты, тесты локально
4. `git push -u origin <branch>`
5. PR в main с описанием + ссылка на patchnote
6. Merge + delete branch

### Текущее состояние истории

```
d86a0dd (HEAD -> main, tag: v0.0.0, origin/main) chore: Initial commit — bootstrap monorepo (bot/api/web)
```

---

## 5. Реализованная функциональность (текущее состояние)

### apps/bot

**Статус:** Placeholder, но рабочее

- ✅ Инициализация бота с токеном из `process.env.BOT_TOKEN`
- ✅ Команда `/start` → отправляет сообщение "Добро пожаловать в Futsal Mini App! 🎮" с кнопкой "Открыть игру" (inline_keyboard)
- ✅ Кнопка открывает Web App по URL из `process.env.WEB_APP_URL`
- ✅ Базовая обработка ошибок (catch всех ошибок, логирование)
- ⏳ Нет: валидация initData, авторизация, бизнес-логика
- 🔍 Использует `bot.command()` для обработки команд

### apps/api

**Статус:** Placeholder, но рабочее

- ✅ Запуск Fastify сервера на `localhost:3001` (порт и хост из env)
- ✅ Эндпоинт GET `/health` → возвращает `{status: "ok", timestamp: ISO8601}`
- ✅ Встроенное логирование (pino, уровень из `process.env.LOG_LEVEL`)
- ✅ Обработка ошибок (global error handler)
- ⏳ Нет: валидация initData, авторизация, бизнес-логика, маршруты
- 🔍 Использует `server.get()` для определения маршрутов

### apps/web

**Статус:** Placeholder, но рабочее

- ✅ React приложение, запускается на `localhost:5173`
- ✅ Инициализация Telegram WebApp SDK: `WebApp.ready()` при монтировании
- ✅ Чтение `WebApp.initDataUnsafe?.user` для отладки (логирует в console)
- ✅ Базовый UI: header ("⚽ Futsal Mini App"), статус инициализации, footer
- ✅ Базовые стили (CSS-переменные, мобильно-ориентированный layout)
- ⏳ Нет: маршруты, API клиент, бизнес-логика, компоненты игровой логики
- 🔍 Использует `useState`, `useEffect` для управления состоянием инициализации

---

## 6. Архитектурный snapshot

### Текущая архитектура (инфраструктурный уровень)

```
┌─────────────────────────────────────────────────────┐
│                 Telegram Client (User)              │
└──────────────┬──────────────────────────────────────┘
               │
        ┌──────┴──────┐
        ▼              ▼
    [Bot]         [Mini App]
    grammY       React + Vite
    ├─ /start    ├─ WebApp.ready()
    └─ buttons   └─ initDataUnsafe (debug)
        │              │
        │              ▼
        │        ┌──────────────┐
        └───────▶│ API (Fastify)│
                 ├─ GET /health │
                 └─ (validators later)
```

### Границы ответственности (как планируется)

| Компонент | Ответственность                                                   | Статус     |
| --------- | ----------------------------------------------------------------- | ---------- |
| **Bot**   | Точка входа, команды, кнопки Web App                              | Skeleton ✓ |
| **API**   | Валидация initData, авторизация, бизнес-логика (ставки, рейтинги) | Skeleton ✓ |
| **Web**   | UI, взаимодействие с API, отображение игрового состояния          | Skeleton ✓ |

### Какие решения уже зафиксированы

- ✅ Monorepo на pnpm workspaces (shared deps, easy scaling)
- ✅ Strict TypeScript везде (no implicit any)
- ✅ Security rule: initData валидируется только на backend
- ✅ Env-based конфигурация (no secrets in code)

### Какие решения отложены (TODO)

- 🔜 Database (PostgreSQL/MongoDB) — post-MVP
- 🔜 Shared types (типы между api/web в отдельном пакете)
- 🔜 API schema (OpenAPI/GraphQL) — после первых маршрутов
- 🔜 E2E тесты, CI/CD pipeline
- 🔜 State management (Redux/Zustand/Context) — если понадобится
- 🔜 Роутинг на web (React Router) — когда будут множественные экраны

---

## 7. Как запустить проект (dev)

### Предусловия

- Node.js >= 18.0.0 установлен
- pnpm >= 8.0.0 установлен (`npm install -g pnpm`)
- Git клон репозитория

### Пошагово

**1. Копировать .env из шаблона:**

```bash
cp .env.example .env
```

**2. Заполнить переменные окружения:**

```dotenv
BOT_TOKEN=<your_bot_token_from_@BotFather>
WEB_APP_URL=https://<your-domain>/  # или localhost для тестирования через ngrok
PORT=3001
HOST=localhost
LOG_LEVEL=info
```

**3. Установить зависимости:**

```bash
pnpm install
```

Результат: создаются `node_modules/`, `pnpm-lock.yaml` обновляется.

**4. Запустить все приложения в dev-режиме (в разных терминалах или параллельно):**

**Вариант A — все вместе:**

```bash
pnpm dev
```

Результат: запускаются bot + api + web одновременно

**Вариант B — по отдельности:**

```bash
# Терминал 1 - Bot (слушает Telegram API, логирует команды)
pnpm dev:bot
# Output: "🤖 Запуск Telegram бота..."

# Терминал 2 - API (слушает на localhost:3001)
pnpm dev:api
# Output: "🚀 Запуск API сервера..." + "✅ API запущен на http://localhost:3001"

# Терминал 3 - Web (HMR сервер на localhost:5173)
pnpm dev:web
# Output: Vite будет слушать на http://localhost:5173
```

**5. Проверить состояние:**

- **API health:** `curl http://localhost:3001/health`
  - Ожидаемый ответ: `{"status":"ok","timestamp":"2026-01-30T...Z"}`

- **Web:** открыть браузер на `http://localhost:5173`
  - Должен показать экран с текстом "✅ Mini App инициализирован"

- **Bot:** отправить `/start` боту в Telegram
  - Должен ответить "Добро пожаловать в Futsal Mini App! 🎮" с кнопкой

**6. Type-check (опционально, для CI):**

```bash
pnpm type-check
```

**7. Сборка (production build):**

```bash
pnpm build
```

Результат: создаются dist/ папки в каждом приложении

---

## 8. Ограничения и договорённости

### MVP-граничения (невозможно нарушить)

- ❌ Реальные деньги, призовые фонды, вывод средств
- ❌ Сложная архитектура заранее (микросервисы, DDD без надобности)
- ❌ Фичи без проверенной пользы
- ❌ Database добавляется только по явной команде

### Security rules (обязательны)

- 🔒 Любые данные с фронта считаются недоверенными
- 🔒 Пользователь определяется на backend только через валидацию initData
- 🔒 initDataUnsafe используется только для отладки/отображения
- 🔒 Никогда не вставляем токены/секреты в код (только .env)

### Definition of Done (перед любым PR)

- ✅ Проект собирается: `pnpm build` без ошибок
- ✅ TypeScript: `pnpm type-check` без ошибок (strict mode)
- ✅ Тестирование в dev: приложения запускаются и основной флоу работает
- ✅ Минимальность: нет лишних зависимостей и фич
- ✅ Документация: если менялось поведение — обновлены docs/ и patchnotes
- ✅ Коммиты: маленькие, осмысленные, без secrets

### Принципиальные запреты

- ❌ `git push` прямо в main (только PR)
- ❌ Коммиты с `any` без явного обоснования
- ❌ Добавление зависимостей без обоснования
- ❌ Изменение contract'ов (API, типов) без patchnotes

---

## 9. Текущее состояние рисков и техдолга

### Потенциально хрупкие моменты

- 🟡 **Bot токен:** Требует валидного BOT_TOKEN из @BotFather для работы. Без него бот не запустится.
- 🟡 **Web App URL:** WEB_APP_URL должен быть реальным HTTPS-доменом для работы в Telegram (localhost требует ngrok для тестирования).
- 🟡 **initDataUnsafe:** Текущий код читает это для отладки, но это не источник правды (security).
- 🟡 **Версионирование:** Нет автоматического bump версий, пока делается вручную через git tag.

### Где ожидаются изменения в будущем

- 🔄 **Database:** Будет добавлена (PostgreSQL или MongoDB) для хранения пользователей, ставок, рейтингов.
- 🔄 **Shared types:** Будет отдельный пакет `packages/types` для шеринга типов между api/web.
- 🔄 **API маршруты:** /health — это placeholder; будут маршруты для ставок, матчей, рейтингов.
- 🔄 **Web компоненты:** Сейчас один App.tsx; будут экраны для матчей, ставок, профиля.
- 🔄 **Routing:** На web будет React Router для навигации между экранами.
- 🔄 **State management:** Возможно, Redux/Zustand для управления игровым состоянием.
- 🔄 **Тестирование:** Unit, Integration, E2E — сейчас отсутствует.

### Техдолг (по приоритетам)

1. **High:** Валидация initData на API + авторизация пользователя (security-critical)
2. **High:** Database schema + миграции (для сохранения данных)
3. **Medium:** API маршруты для основного флоу (ставки, матчи)
4. **Medium:** Web компоненты и роутинг (основной UI)
5. **Low:** Тестирование, CI/CD, документация API

### Что важно учитывать при следующей задаче

- ✏️ Перед любой разработкой: прочитать `/docs/product-spec.md` и `/docs/tech-stack.md`
- ✏️ Коммиты должны быть маленькими, каждый — логичный шаг
- ✏️ После изменения поведения: обновить/создать patchnote
- ✏️ Не нарушать security rules (initData validation)
- ✏️ Не добавлять новые зависимости без обоснования
- ✏️ Type-check должен проходить (no `any` по умолчанию)

---

## Summary

**fs-tma v0.0.0** — это полностью инициализированная монорепа с тремя приложениями (bot/api/web), которые содержат минимальный рабочий код для базовой инициализации без бизнес-логики. Проект готов к разработке функционала: все три приложения собираются, типизируются, запускаются в dev-режиме. Git workflow установлен, patchnotes структурирован, документация подготовлена. Следующий этап — разработка авторизации, API маршрутов и основных компонентов игровой логики.

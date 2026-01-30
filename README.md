# Telegram Mini App для локальной лиги футзала

Игра прогнозов с виртуальной валютой, построенная на Telegram Mini App.

## Структура проекта

Это monorepo на pnpm. Основные приложения:

- `apps/bot` — Telegram Bot (grammY)
- `apps/api` — Backend API (Fastify)
- `apps/web` — Telegram Mini App (React + Vite)

## Быстрый старт

### Установка зависимостей

```bash
pnpm install
```

### Разработка

Запустить все приложения в dev-режиме:

```bash
pnpm dev
```

Или отдельные приложения:

```bash
pnpm dev:bot
pnpm dev:api
pnpm dev:web
```

### Сборка

```bash
pnpm build
```

### Type-check

```bash
pnpm type-check
```

## Технологический стек (MVP)

| Компонент | Стек |
|-----------|------|
| Bot | grammY + Node.js + TypeScript |
| API | Fastify + Node.js + TypeScript |
| Web | React + Vite + TypeScript |

## Требования

- Node.js >= 18
- pnpm >= 8

## Документация

- [Product Spec](/docs/product-spec.md)
- [Tech Stack](/docs/tech-stack.md)

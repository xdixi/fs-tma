import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk";

/**
 * Инициализация Telegram Mini App
 * На этом этапе MVP — только базовый экран и готовность WebApp
 */
function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    /**
     * Инициализация Telegram WebApp SDK
     * Это обязательный вызов для корректной работы Mini App
     */
    if (WebApp) {
      WebApp.ready();
      setIsReady(true);
      console.log("✅ Telegram WebApp готов к работе");

      // Получаем информацию о пользователе (если доступна)
      const user = WebApp.initDataUnsafe?.user;
      if (user) {
        console.log(`👤 Пользователь: ${user.first_name}`);
      }
    }
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>⚽ Futsal Mini App</h1>
      </header>

      <main className="app-main">
        {isReady ? (
          <div className="status">
            <p className="status-text">✅ Mini App инициализирован</p>
            <p className="status-subtext">Начнём разработку! 🚀</p>
          </div>
        ) : (
          <div className="status">
            <p className="status-text">⏳ Инициализация...</p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>v0.0.0 — Bootstrap этап</p>
      </footer>
    </div>
  );
}

export default App;

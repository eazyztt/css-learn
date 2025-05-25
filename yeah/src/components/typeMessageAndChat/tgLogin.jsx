// components/TelegramLogin.js
import { useEffect } from "react";

export default function TelegramLogin() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?7";
    script.async = true;
    script.setAttribute("data-telegram-login", "dima123456_bot"); // 🔁 замени на своего бота
    script.setAttribute("data-size", "large");
    script.setAttribute("data-userpic", "false");
    script.setAttribute("data-request-access", "write");
    script.setAttribute("data-onauth", "onTelegramAuth(user)");

    document.getElementById("telegram-button").appendChild(script);

    // Глобальная функция для Telegram (будет вызвана при авторизации)
    window.onTelegramAuth = function (user) {
      fetch("http://localhost:3000/auth/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Авторизован!", data);
          // например, сохранить пользователя или редирект
        })
        .catch((err) => {
          console.error("Ошибка авторизации:", err);
        });
    };
  }, []);

  return <div id="telegram-button"></div>;
}

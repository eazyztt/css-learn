// components/TelegramLogin.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TelegramLogin() {
  const navigate = useNavigate();
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
      fetch(`${import.meta.env.VITE_HOST}/auth/telegram`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Авторизован!", data);
          navigate("/");
        })
        .catch((err) => {
          console.error("Ошибка авторизации:", err);
        });
    };
  }, []);

  return <div id="telegram-button"></div>;
}

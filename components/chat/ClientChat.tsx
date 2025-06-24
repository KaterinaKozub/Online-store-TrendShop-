'use client'; // Обов’язково для клієнтського компоненту

import { useEffect } from "react";

export default function ClientChat() {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://cdn.pulse.is/livechat/loader.js"]'
    );

    if (existingScript) return; // Щоб не додавати скрипт повторно

    const script = document.createElement("script");
    script.src = "https://cdn.pulse.is/livechat/loader.js";
    script.setAttribute("data-live-chat-id", "67ed6e58735e47d1ff0b7fe9");
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // Нічого не рендеримо
}

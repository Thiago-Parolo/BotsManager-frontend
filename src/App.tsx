import { useContext } from "react";

import { Arnitem } from "./pages/Arnitem";
import { Edgar } from "./pages/Edgar";
import { Header } from "./components/Header";
import { Ibuki } from "./pages/Ibuki";
import { BotContext } from "./contexts/bot";
import { ConnectProvider } from "./contexts/connect";

export function App() {
  const { name } = useContext(BotContext);

  function Component() {
    switch (name) {
      case "/arnitem":
        return <Arnitem />;
      case "/edgar":
        return <Edgar />;
      case "/ibuki":
        return <Ibuki />;
    }
  }

  return (
    <main>
      <Header />
      {Component()}
    </main>
  )
}
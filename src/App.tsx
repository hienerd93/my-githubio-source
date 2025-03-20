import { useState } from "react";
import { Chatbot } from "./components/feature/chatbot";
import { Private } from "./Private";

function App() {
  const [canAccessPrivate, setCanAccessPrivate] = useState(false);
  return (
    <>
      <Chatbot onAccept={() => setCanAccessPrivate(true)} />
      {canAccessPrivate && <Private />}
    </>
  );
}

export default App;

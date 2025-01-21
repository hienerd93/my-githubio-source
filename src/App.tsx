import { useState } from "react";
import { TypographyH1, TypographyP } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TypographyH1>Vite + React</TypographyH1>
      <div>
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <TypographyP>
          Edit <code>src/App.tsx</code> and save to test HMR
        </TypographyP>
      </div>
      <TypographyP>Click on the Vite and React logos to learn more</TypographyP>
    </>
  );
}

export default App;

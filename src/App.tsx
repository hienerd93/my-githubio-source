import React, { useRef, useState } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import useSWR from "swr";
import { pipe } from "./lib/utils";
import { chunk } from "lodash";
import { LexisCard } from "./components/feature/lexis-card";
import { Button } from "./components/ui/button";

const regex =
  /(?<=(<td class="s0" dir="ltr">|<td class="s1" dir="ltr">))(.*?)(?=<\/td>)/g;

const parseDataFromApi = pipe(
  (value: string) => value.match(regex),
  (value: string[]) => chunk(value, 6)
);

const publicSheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSesyDPxMF06ZQC5dAwofNMCEJhjun0WgNm9HwC_TyBWWKfngkrT3x1CUwvbgGvblMhBnaciPH24rXJ/pubhtml?gid=612561317&single=true";
const fetcher = (url: string) => fetch(url).then((res) => res.text());

function App() {
  const { data, error, isLoading } = useSWR(publicSheetUrl, fetcher);
  const [number, setNumber] = useState(-1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRandom = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    audioRef.current = new Audio(`./${num * 10 + 1}-${(num + 1) * 10}.mp3`);
    audioRef.current.play();
    setNumber(num);
  };

  const handleReset = () => {
    audioRef.current?.pause();
    setNumber(-1);
  };

  const wordList: string[][] =
    !error && !isLoading && data ? parseDataFromApi(data) : [];

  const randomWordList =
    number === -1 ? wordList : wordList.slice(number * 10, (number + 1) * 10);

  return (
    <>
      <TypographyH1>List 1000 common words</TypographyH1>
      <Button onClick={handleRandom} disabled={number > -1}>
        Random
      </Button>
      <Button onClick={handleReset}>Reset</Button>
      <div className="grid gap-4 grid-cols-3 p-20">
        {React.Children.toArray(
          randomWordList.map((item) => <LexisCard cardContent={item} />)
        )}
      </div>
    </>
  );
}

export default App;

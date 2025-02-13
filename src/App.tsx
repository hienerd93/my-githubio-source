import React, { useRef, useState } from "react";
import { TypographyH1 } from "@/components/ui/typography";
import useSWR from "swr";
import { pipe } from "./lib/utils";
import { chunk } from "lodash";
import { LexisCard } from "./components/feature/lexis-card";
import { Button } from "./components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { buttons, fetchAndSetAll } from "./fetch";

const regex =
  /(?<=(<td class="s0" dir="ltr">|<td class="s1" dir="ltr">))(.*?)(?=<\/td>)/g;

const baseUrl = import.meta.env.VITE_GITHUB_URL;

const parseDataFromApi = pipe(
  (value: string) => value.match(regex),
  (value: string[]) => chunk(value, 6)
);

const fetcher = (url: string) => fetch(url).then((res) => res.text());

function App() {
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_PUBLIC_SHEET_URL,
    fetcher
  );
  const [number, setNumber] = useState(-1);
  const [text, setText] = useState("");
  const [editor, setEditor] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleRandom = () => {
    const num = Math.floor(Math.random() * 100) + 1;
    const audioUrl = import.meta.env.VITE_DROPBOX_URL.split(",")[num];
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setNumber(num);
  };

  const handleReset = () => {
    audioRef.current?.pause();
    setNumber(-1);
  };

  const getData = (text: string) => {
    fetchAndSetAll([
      {
        url: baseUrl + text + ".html",
        setter: setText,
      },
      {
        url: baseUrl + text + ".py",
        setter: setEditor,
      },
    ]).catch(console.error);
  };

  const wordList: string[][] =
    !error && !isLoading && data ? parseDataFromApi(data) : [];

  const randomWordList =
    number === -1 ? wordList : wordList.slice(number * 10, (number + 1) * 10);

  return (
    <>
      <Tabs defaultValue="english">
        <TabsList>
          <TabsTrigger value="english">english</TabsTrigger>
          <TabsTrigger value="solve-problem">solve problem</TabsTrigger>
        </TabsList>
        <TabsContent value="english">
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
        </TabsContent>
        <TabsContent value="solve-problem">
          <div className="grid gap-4 grid-cols-3 p-20">
            {React.Children.toArray(
              buttons.map((item) => (
                <Button onClick={() => getData(item)}>{item}</Button>
              ))
            )}
          </div>
          <div className="grid gap-4 grid-cols-2 p-20">
            <div
              className="border-solid border-2 border-gray-600 rounded-xl p-4"
              dangerouslySetInnerHTML={{ __html: text }}
            />
            <pre className="rounded-xl p-4 text-white bg-black">{editor}</pre>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;

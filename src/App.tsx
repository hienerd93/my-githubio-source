import React, { useRef, useState } from "react";
import { Typography } from "@/components/ui/typography";
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
  (value: string) => value.replace(/&#39;/g, '"'),
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
  const [hashVideo, setHashVideo] = useState("");
  const [heightVideo, setHeightVideo] = useState(480);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleReplay = () => {
    audioRef.current?.play();
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
          <TabsTrigger value="shadowing">shadowing</TabsTrigger>
        </TabsList>
        <TabsContent value="english">
          <Typography
            as="h1"
            className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
          >
            List 1000 common words
          </Typography>
          <Button onClick={handleRandom} disabled={number > -1}>
            Random
          </Button>
          <Button onClick={handleReset}>Reset</Button>
          <Button onClick={handleReplay}>Replay</Button>
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
                <Button onClick={() => getData(item)}>
                  {item.split("/").at(-1)}
                </Button>
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
        <TabsContent value="shadowing">
          <input className="border-black border" ref={inputRef} />
          <button
            type="button"
            onClick={() => setHashVideo(inputRef.current?.value || "")}
          >
            submit
          </button>
          {hashVideo && (
            <>
              <div style={{ height: heightVideo, overflow: "hidden" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${hashVideo}`}
                  allow="autoplay; encrypted-media"
                  title="video"
                  width={853}
                  height={480}
                />
              </div>
              <button
                className="border-black border m-4"
                type="button"
                onClick={() => setHeightVideo(480)}
              >
                both sub
              </button>
              <button
                className="border-black border m-4"
                type="button"
                onClick={() => setHeightVideo(400)}
              >
                eng sub
              </button>
              <button
                className="border-black border m-4"
                type="button"
                onClick={() => setHeightVideo(340)}
              >
                no sub
              </button>
            </>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

export default App;

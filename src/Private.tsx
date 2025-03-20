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
  (value: string) => value.replace(/&#39;/g, "'").replace("&quot;", '"'),
  (value: string) => value.split("</table"),
  (value: string[]) => value.map((v) => v.match(regex))
);

const fetcher = (url: string) => fetch(url).then((res) => res.text());

export function Private() {
  const { data, error, isLoading } = useSWR(
    import.meta.env.VITE_PUBLIC_SHEET_URL,
    fetcher
  );
  const [number, setNumber] = useState(-1);
  const [text, setText] = useState("");
  const [editor, setEditor] = useState("");
  const [hashVideo, setHashVideo] = useState("");

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

  const [wordListRaw, , postcardRaw] =
    !error && !isLoading && data ? parseDataFromApi(data) : [];
  const wordList: string[][] = chunk(wordListRaw, 6);
  const postCard: string[][] = chunk(postcardRaw, 4);

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
          {React.Children.toArray(
            postCard
              .slice(1)
              .map((item) => (
                <Button onClick={() => setHashVideo(item[2])}>{item[1]}</Button>
              ))
          )}
          {hashVideo && (
            <iframe
              src={`https://www.youtube.com/embed/${hashVideo}`}
              allow="autoplay; encrypted-media"
              title="video"
              width={853}
              height={480}
            />
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}

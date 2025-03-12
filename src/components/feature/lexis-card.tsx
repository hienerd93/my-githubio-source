import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Typography } from "../ui/typography";

interface Props {
  cardContent: string[];
}

const LexisCard = ({
  cardContent: [index, word, ipa, meaning, example, exampleVnTrans],
}: Props) => {
  return (
    <div className="group h-40 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <Card className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden] text-center">
          <CardHeader>
            <CardTitle>
              {index} {word}
            </CardTitle>
            <CardDescription>{ipa}</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography>{example}</Typography>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <Card className="absolute inset-0 h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <CardHeader>
            <CardTitle>
              {index} {meaning}
            </CardTitle>
            <CardDescription>{ipa}</CardDescription>
          </CardHeader>
          <CardContent>
            <Typography>{exampleVnTrans}</Typography>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </div>
    </div>
  );
};

export { LexisCard };

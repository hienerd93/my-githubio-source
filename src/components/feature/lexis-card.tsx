import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TypographyP } from "../ui/typography";

interface Props {
  cardContent: string[];
}

const LexisCard = ({
  cardContent: [index, word, ipa, meaning, example, exampleVnTrans],
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {index} {word}
        </CardTitle>
        <CardDescription>
          {ipa} {meaning}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TypographyP>{example}</TypographyP>
        <TypographyP>{exampleVnTrans}</TypographyP>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export { LexisCard };

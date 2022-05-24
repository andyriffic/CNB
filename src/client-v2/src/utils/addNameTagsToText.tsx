import React, { ReactElement } from "react";
import NameTag from "../components/NameTag";

const nameList = [
  "hudson",
  "andy",
  "andrew",
  "byron",
  "ash",
  "ashlee",
  "pratik",
  "carol",
  "rishita",
  "marion",
  "jay",
  "james",
  "chris",
  "albert",
  "zijian",
  "shu ming",
  "harry",
  "yin",
];

export const addNameTagsToText = (text: string): ReactElement => {
  const words: (string | ReactElement)[] = text.split(" ");
  words.map((word, index: number) => {
    if (nameList.includes((word as string).toLowerCase())) {
      const capitalized = (word as string)[0].toUpperCase() + (word as string).slice(1);
      words[index] = <NameTag>{capitalized}</NameTag>;
    } else {
      words[index] += " ";
    }
  });
  return <>{words}</>;
};

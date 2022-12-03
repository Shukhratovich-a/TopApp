import React from "react";
import { Button, Htag, P, Rating, Tag } from "../components";

const Home = (): JSX.Element => {
  const [rating, setRating] = React.useState<number>(4);

  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="down">
        Button
      </Button>
      <Button appearance="ghost" arrow="right">
        Button
      </Button>
      <P size="l">Большой</P>
      <P size="m">Средний</P>
      <P size="s">Маленький</P>
      <Tag size="s">Ghost</Tag>
      <Tag size="m" color="red">
        Red
      </Tag>
      <Tag size="m" color="green">
        Green
      </Tag>
      <Tag size="m" color="primary">
        Primary
      </Tag>
      <Tag size="m" color="grey">
        Grey
      </Tag>
      <Rating rating={rating} setRating={setRating} isEditable />
    </>
  );
};

export default Home;

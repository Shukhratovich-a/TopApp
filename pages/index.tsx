import React from "react";
import { GetStaticProps } from "next";
import axios from "axios";

import { MenuItem } from "../interfaces/menu.interface";

import { withLayout } from "../layout/Layout";
import { Button, Htag, P, Rating, Tag } from "../components";

const Home = ({ menu }: HomeProps): JSX.Element => {
  const [rating, setRating] = React.useState<number>(4);

  console.log(menu);

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

      <Tag size="s" color="ghost">
        Ghost
      </Tag>
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

      {/* <ul>
        {menu.map((m) => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul> */}
    </>
  );
};

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
    firstCategory,
  });

  console.log(data);

  return {
    props: {
      menu: data,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

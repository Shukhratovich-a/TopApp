import React from "react";
import { GetStaticProps } from "next";

import { MenuItem } from "../interfaces/menu.interface";

import { withLayout } from "../layout/Layout";

const Search = (): JSX.Element => {
  return <>Search</>;
};

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const res = await fetch(process.env.NEXT_PUBLIC_DOMAIN + "/api/top-page/find", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstCategory,
    }),
  });
  const menu: MenuItem[] = await res.json();

  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

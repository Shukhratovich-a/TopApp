import React from "react";
import { GetStaticProps } from "next";

import { MenuItem } from "../interfaces/menu.interface";

import { API } from "../helpers";

import { withLayout } from "../layout/Layout";

const Search = (): JSX.Element => {
  return <>Search</>;
};

export default withLayout(Search);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const firstCategory = 0;
    const res = await fetch(API.topPage.find, {
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
  } catch {
    return {
      notFound: true,
    };
  }
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

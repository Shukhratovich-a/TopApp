import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";

import { MenuItem } from "../../interfaces/menu.interface";
import { TopLevelCategory, TopPageModel } from "../../interfaces/toppage.interface";
import { ProductModel } from "../../interfaces/product.interface";

import { API, firstLevelMenu } from "../../helpers";

import { withLayout } from "../../layout/Layout";
import { TopPageComponent } from "../../page-components";

const TopPage = ({ firstCategory, page, products }: TopPageProps): JSX.Element => {
  return <TopPageComponent firstCategory={firstCategory} page={page} products={products} />;
};

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const resMenu = await fetch(API.topPage.find, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstCategory: m.id,
      }),
    });
    const menu: MenuItem[] = await resMenu.json();
    paths = paths.concat(menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)));
  }

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }

  try {
    const resMenu = await fetch(API.topPage.find, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstCategory: firstCategoryItem.id,
      }),
    });
    const menu: MenuItem[] = await resMenu.json();

    if (menu.length === 0) {
      return {
        notFound: true,
      };
    }

    const resPage = await fetch(API.topPage.byAlias + params.alias);
    const page: TopPageModel = await resPage.json();

    const resProducts = await fetch(API.product.find, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: page.category,
        limit: 10,
      }),
    });
    const products: ProductModel[] = await resProducts.json();

    return {
      props: {
        menu,
        page,
        products,
        firstCategory: firstCategoryItem.id,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  page: TopPageModel;
  products: ProductModel[];
  firstCategory: TopLevelCategory;
}

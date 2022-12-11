import React from "react";
import Head from "next/head";

import { AppProps } from "next/app";

import { DOMAIN } from "../helpers";

import ym, { YMInitializer } from "react-yandex-metrika";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps, router }: AppProps): JSX.Element => {
  console.log(router);

  router?.events.on("routeChangeComplete", (url: string) => {
    if (typeof window !== "undefined") {
      ym("hit", url);
    }
  });

  return (
    <>
      <Head>
        <title>MyTop - наш лучший топ</title>

        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;700&display=swap" />

        <meta property="og:url" content={DOMAIN + router.asPath} />
        <meta property="og:local" content="ru_RU" />
      </Head>

      <YMInitializer accounts={[]} options={{ webvisor: true, defer: true }} version="2" />

      <Component {...pageProps} />
    </>
  );
};

export default MyApp;

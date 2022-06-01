import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";

export type Layout = (page: ReactElement) => ReactNode;

export type NextPageWithLayout = NextPage & {
  layout?: Layout;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

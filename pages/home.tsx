import React from "react";
import { ExampleNestedLayout } from "../components/layouts/ExampleNestedLayout";
import { NextPageWithLayout } from "../lib/types/layouts";
import { HomeView } from "../components/views/HomeView";

const Home: NextPageWithLayout = () => {
  return <HomeView />;
};

Home.layout = ExampleNestedLayout;

export default Home;

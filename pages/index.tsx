import Router from "next/router";
import { ExampleLayout } from "../components/layouts/ExampleLayout";
import { NextPageWithLayout } from "../lib/types/layouts";

const Root: NextPageWithLayout = () => {
  return (
    <>
      <button
        onClick={() => {}}
        onMouseEnter={() => {
          Router.prefetch("home");
        }}
      >
        Home
      </button>
    </>
  );
};

Root.layout = ExampleLayout;

export default Root;

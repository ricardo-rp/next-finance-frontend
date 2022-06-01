import { Layout } from "../../lib/types/layouts";
import { ExampleLayoutComponent } from "./ExampleLayout";

export const ExampleNestedLayout: Layout = (page) => {
  return (
    <>
      <header>Este banner avisa coisas importantes</header>
      <ExampleLayoutComponent>
        <aside>aqui teriam navlinks</aside>
        {page}
      </ExampleLayoutComponent>
    </>
  );
};

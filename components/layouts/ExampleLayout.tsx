import { Layout } from "../../lib/types/layouts";
import { ExampleFooter } from "../examples/ExampleFooter";
import { ExampleNavbar } from "../examples/ExampleNavbar";

export const ExampleLayoutComponent: React.FC = ({ children }) => (
  <div>
    <ExampleNavbar className="sticky-top" />

    {children}

    <ExampleFooter className="sticky-bottom" />

    <style jsx>{`
      div {
        height: 100%;
      }
    `}</style>
  </div>
);

export const ExampleLayout: Layout = (page) => {
  return <ExampleLayoutComponent>{page}</ExampleLayoutComponent>;
};

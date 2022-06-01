import { Layout } from "../../lib/services/types/layouts";
import { ExampleFooter } from "../examples/ExampleFooter";
import { ExampleNavbar } from "../examples/ExampleNavbar";

export const ExampleLayoutComponent: React.FC = ({ children }) => (
  <div className="min-h-screen">
    <ExampleNavbar className="sticky top-0" />

    <main className="container">{children}</main>

    <ExampleFooter className="sticky top-full" />
  </div>
);

export const ExampleLayout: Layout = (page) => {
  return <ExampleLayoutComponent>{page}</ExampleLayoutComponent>;
};

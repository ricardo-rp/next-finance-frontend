import { ExampleLayout } from "../../components/layouts/ExampleLayout";
import { LoginView } from "../../components/views/LoginView";
import { NextPageWithLayout } from "../../lib/types/layouts";

const Login: NextPageWithLayout = () => {
  return <LoginView />;
};

Login.layout = ExampleLayout;

export default Login;

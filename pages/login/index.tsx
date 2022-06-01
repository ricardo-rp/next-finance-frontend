import { ExampleLayout } from "../../components/layouts/ExampleLayout";
import { LoginView } from "../../components/views/LoginView";
import { NextPageWithLayout } from "../../lib/services/types/layouts";

const Login: NextPageWithLayout = () => {
  //<UseForbidAuthed></UseForbidAuthed>
  return <LoginView />;
};

Login.layout = ExampleLayout;

export default Login;

import React from "react";
import { ExampleNestedLayout } from "../components/layouts/ExampleNestedLayout";
import { NextPageWithLayout } from "../lib/services/types/layouts";
import { useRoutePermission } from "../lib/utils/useRoutePermission";
import { UserPermissionLevels } from "../lib/types/UserPermissionLevels";
import { HomeView } from "../components/views/HomeView";

const Home: NextPageWithLayout = () => {
  useRoutePermission(UserPermissionLevels.authed, "/login");

  return <HomeView />;
};

Home.layout = ExampleNestedLayout;

export default Home;

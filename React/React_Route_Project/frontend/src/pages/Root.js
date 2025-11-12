import { Outlet, useNavigation } from "react-router-dom";

import MainNavigation from "../components/MainNavigation.js";

function RootLayout() {
 // const navigation = useNavigation();

  //navigation.state === 'L';

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;

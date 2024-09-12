import { Suspense } from "react";
// import Loader from '../components/render/Loader'
import Render from "../components/render/Render";
import Tea from "../components/ui/loader/tea";
import Navbar from "../components/ui/navbar";

function App({backend}) {
  return (
    <>
      <Suspense fallback={<Tea />}>
      <Navbar />
        <Render backend={backend}/>
      </Suspense>
    </>
  );
}

export default App;

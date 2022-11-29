import { useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import Index from "./components/user/Index";
import { getAllUsers } from "./server";

function App() {
  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <div className="h-screen p-4 flex">
        <Sidebar />
        <Index/>
      </div>
    </>
  );
}

export default App;

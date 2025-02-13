import Checkout from "@src/containers/checkout";
import Payment from "@src/containers/payment";
import LocalStorageService from "@src/services/localstorage.service";
import { useEffect, useState } from "react";

function App() {
  const [isCheckedOut, setIsCheckedOut] = useState(
    LocalStorageService.getItem("isCheckedOut")
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsCheckedOut(LocalStorageService.getItem("isCheckedOut"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [localStorage]);

  return (
    <main className="bg-cyan-50 w-[100vw] h-[100vh] py-9 overflow-y-scroll">
      {isCheckedOut === "true" ? <Payment /> : <Checkout />}
    </main>
  );
}

export default App;

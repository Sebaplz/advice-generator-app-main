import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});

  const fetchApi = async () => {
    await fetch("https://api.adviceslip.com/advice")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (error) {
    return (
      <div className="text-red-500 text-center">Error: {error.message}</div>
    );
  } else if (!isLoaded) {
    return <div className="text-[#cee3e9] text-center">Loading...</div>;
  } else {
    return (
      <main className="container px-5 mx-auto min-h-screen flex justify-center items-center">
        <div className="bg-[#323a49] rounded-lg max-w-[480px]">
          <h1 className="text-[#52ffa8] text-center tracking-widest text-xs p-5">
            ADVICE #{items.slip.id}
          </h1>
          <p className="text-[#cee3e9] font-bold text-2xl text-center px-10">
            "{items.slip.advice}"
          </p>
          <div className="px-5 py-5">
            <picture>
              <source
                srcset="images/pattern-divider-mobile.svg"
                media="(max-width: 375px)"
                alt="Imagen divider mobile"
              />
              <img
                src="images/pattern-divider-desktop.svg"
                alt="Imagen divider"
              />
            </picture>
          </div>
          <div className="flex justify-center">
            <button
              onClick={fetchApi}
              className="bg-[#52ffa8] hover:bg-[#88ffc4] rounded-full w-[50px] h-[50px] flex justify-center items-center -mb-[25px]"
            >
              <img src="images/icon-dice.svg" alt="Imagen boton" />
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default App;

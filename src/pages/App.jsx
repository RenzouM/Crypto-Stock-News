import { useEffect, useState } from "react";
import "./App.css";
import Card from "../Card";
import NavBar from "../NavBar";
import Footer from "../Footer";
import Stocksup from "../assets/stocksup.svg";
import Stocks from "../assets/stocks.svg";
import Argentina from "../assets/argentina.svg";
import dolarImg from "../assets/dolar.png";

function App() {
  const [news, setNews] = useState();
  const [page, setPage] = useState(1);
  const [newsPerPage, setNewsPerPage] = useState(calculateNewsPerPage());

  const fetchData = async () => {
    try {
      // Obtener noticias
      const newsResponse = await fetch(
        "https://saurav.tech/NewsAPI/top-headlines/category/health/in.json"
      );
      const newsData = await newsResponse.json();
      setNews(newsData);
    } catch (error) {
      // Manejar cualquier error que ocurra durante la solicitud o el procesamiento de datos
      console.error("Error al obtener noticias:", error);
    }
  };

  const pageNews = action => {
    if (action === "next" && news) {
      if (page < Math.ceil(news.articles.length / newsPerPage)) {
        setPage(page + 1);
      }
    } else if (action === "back" && page > 1) {
      setPage(page - 1);
    }
  };

  // Función para calcular newsPerPage basado en el ancho de la pantalla
  function calculateNewsPerPage() {
    const windowWidth = window.innerWidth;
    if (windowWidth < 1000 && windowWidth >= 800) {
      return 3;
    } else if (windowWidth < 800 && windowWidth >= 600) {
      return 2;
    } else if (windowWidth < 600) {
      return 1;
    } else {
      return 4;
    }
  }

  // Función que se ejecuta cuando cambia el tamaño de la pantalla
  function handleWindowSizeChange() {
    const newNewsPerPage = calculateNewsPerPage();
    setNewsPerPage(newNewsPerPage); // Actualiza newsPerPage cuando cambia el tamaño de la pantalla
  }

  // Agregar un event listener para el evento "resize" (cambio de tamaño)
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    // Limpia el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  useEffect(() => {
    fetchData(); // Llama a fetchData dentro de useEffect
  }, []);

  return (
    <main>
      <NavBar />
      <div className="md:w-full p-2 mx-auto mt-8">
        <div className="flex flex-wrap justify-evenly">
          <div className="flex flex-wrap w-[290px]">
            <div className="relative w-[290px] h-[290px] flex p-0 m-0">
              <div className="loader absolute"></div>
              <img
                src={Argentina}
                className="w-[290px] h-[290px] p-0 m-0"
              />
            </div>

            <div className="m-auto my-5 sm:mt-0">
              <h2 className="opacity-70 text-4xl text-gray-50 w-[195px] ">
                blueArg
              </h2>
              <hr className="opacity-10"></hr>
            </div>
          </div>

          <div className="md:w-[325px] p-4">
            <h1 className="  text-3xl text-center text-white">
              <strong>Real-time</strong> news and assets prices
              <span className="m-0 p-0 texto2 text-3xl text-[#68e0f0]">.-</span>
            </h1>
            <blockquote class="text-xl italic font-semibold text-gray-900 dark:text-white mt-3 mb-8 opacity-80">
              <p>
                Practice your trading and track it without the need to create an
                account.
              </p>
            </blockquote>
            <div className="flex justify-center mx-auto relative h-40">
              <img
                className="mx-auto scale-[240%] mt-8"
                src={Stocks}
              />
              <img
                className="w-[75px] animacion-subir-bajar mx-auto absolute bottom-0 right-10"
                src={Stocksup}
              />
            </div>
          </div>
        </div>

        <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mt-20">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-sky-200 from-sky-400">
            Latest News
          </span>{" "}
          in real Time.
        </h1>
        <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mb-8">
          Don't miss any news and follow it daily. Always stay informed wherever
          you go.
        </p>

        <section className="my-2 border-[#7e7e7e] bg-opacity-80 rounded-lg flex overflow-hidden">
          <button
            className="bg-gray-700 hover:bg-gray-700 opacity-50 w-12 rounded-r-none text-2xl p-2 border border-opacity-25 border-gray-600"
            onClick={() => pageNews("back")}>
            &lt;
          </button>
          <div className="flex w-full justify-evenly">
            {news &&
              news.articles &&
              news.articles
                .slice((page - 1) * newsPerPage, page * newsPerPage)
                .map((article, index) => (
                  <a
                    key={index}
                    href={article.url}
                    className="sm:w-[250px] w-full h-[300px] block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-opacity-50 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-800">
                    <p class="font-normal text-gray-700 text-left dark:text-gray-400 line-clamp-1">
                      {article.author ? article.author : "News"}
                    </p>
                    <h5 class="mb-2 text-left font-bold tracking-tight text-gray-900 dark:text-white line-clamp-3">
                      {article.title}
                    </h5>
                    <p class="font-normal text-left  text-gray-700 dark:text-gray-400 line-clamp-6">
                      {article.description}
                    </p>
                  </a>
                ))}
          </div>

          <button
            className="bg-gray-700 opacity-50 w-12 hover:bg-gray-700 rounded-l-none text-2xl p-2 border border-opacity-25 border-gray-600 ms-auto"
            onClick={() => pageNews("next")}>
            &gt;
          </button>
        </section>
      </div>
      <Footer />
    </main>
  );
}

export default App;

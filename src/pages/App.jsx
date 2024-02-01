import { useEffect, useState } from "react";
import "./App.css";
import Card from "../Card";
import NavBar from "../NavBar";
import Footer from "../Footer";

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
      <div className="md:w-[900px] p-2 mx-auto mt-8">
        <div className="flex flex-wrap justify-evenly">
          <div className="flex flex-wrap w-[290px]">
            <div className="relative w-[290px] h-[290px] flex p-0 m-0">
              <div className="loader absolute"></div>
              <img
                src="assets/argentina.svg"
                className="w-[290px] h-[290px] p-0 m-0"
              />
            </div>

            <div className="m-auto my-5 sm:mt-0">
              <h2 className="texto text-4xl text-gray-50 w-[195px] ">
                blueArg
              </h2>
              <hr className="opacity-10"></hr>
            </div>
          </div>

          <div className="md:w-[325px] p-4">
            <h1 className="texto2  text-3xl text-center text-white">
              Cotizaciones y noticias<strong> en tiempo real</strong>
              <span className="m-0 p-0 texto2 text-3xl text-[#68e0f0]">.-</span>
            </h1>
            <h4 className="text-pretty text-start text-xl text-gray-400 m-auto mt-3 mb-8 ">
              Practica tu trading y dale seguimiento sin la necesidad de crearte
              una cuenta.
            </h4>
            <div className="flex justify-center mx-auto relative h-40">
              <img
                className="mx-auto  scale-[220%] mt-8"
                src="assets/stocks.svg"
              />
              <img
                className="w-[70px] animacion-subir-bajar mx-auto absolute bottom-0 right-10"
                src="assets/stocksup.svg"
              />
            </div>
          </div>
        </div>
        <div className="flex h-auto justify-center w-full mt-4">
          <h1 className="skills mx-auto p-0 border-b-0 px-3 text-[#68e0f0]">
            NOT<span className="text-white">IC</span>IAS
          </h1>
        </div>
        <section className="border-solid border-opacity-20 border   border-[#7e7e7e] bg-[#202020] rounded-lg flex overflow-hidden">
          <button
            className="bg-gray-600 opacity-50 rounded-r-none text-2xl p-2 border border-opacity-25 border-gray-600"
            onClick={() => pageNews("back")}>
            &lt;
          </button>
          <div className="flex w-full justify-evenly">
            {news &&
              news.articles &&
              news.articles
                .slice((page - 1) * newsPerPage, page * newsPerPage)
                .map((article, index) => (
                  <Card
                    key={index}
                    author={article.author}
                    title={article.title}
                    url={article.url}
                    description={article.description}
                  />
                ))}
          </div>
          <button
            className="bg-gray-600 opacity-50 rounded-l-none text-2xl p-2 border border-opacity-25 border-gray-600 ms-auto"
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

import { useEffect, useState } from "react";
import "./App.css";
import argentina from "../assets/argentina.svg";
import Card from "../Card";
import NavBar from "../NavBar";
import stocks from "../assets/stocks.svg";
import stocksup from "../assets/stocksup.svg";
import Footer from "../Footer";

function App() {
  const [news, setNews] = useState();
  const [page, setPage] = useState(1);
  const [weather, setWeather] = useState();
  const [newsPerPage, setNewsPerPage] = useState(calculateNewsPerPage());

  useEffect(() => {
    // Obtener la ubicación basada en la dirección IP del usuario
    fetch("https://ipinfo.io/json")
      .then((response) => response.json())
      .then((data) => {
        const { loc } = data;
        const [latitude, longitude] = loc.split(",");
        setLocation({ latitude, longitude });

        // Hacer una solicitud a la API de clima utilizando la ubicación
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`)
          .then((response) => response.json())
          .then((data) => {
            setWeather(data.hourly.temperature_2m[data.hourly.temperature_2m.length - 1]);
          })
          .catch((error) => {
            console.error("Error al obtener datos de clima:", error);
          });
      })
      .catch((error) => {
        console.error("Error al obtener ubicación basada en IP:", error);
      });

    // Obtener noticias
    fetch("https://newsapi.org/v2/top-headlines?sources=google-news-ar&apiKey=f7267ad5dea0459cb132e5b92ab747d0")
      .then((response) => response.json())
      .then((data) => {
        setNews(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error al obtener noticias:", error);
      });
  }, []);

  const pageNews = (action) => {
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

  return (
    <>
      <NavBar />
      <header className="grid sm:grid-cols-2 mt-12 m-0 p-4">
        <section className="grid justify-center">
          <div className="relative w-[290px] h-[290px] flex p-0 m-0">
            <div className="loader absolute"></div>
            <img src={argentina} className="w-[290px] h-[290px] p-0 m-0" />
          </div>
          <div className="contenedor p-4">
            <h2 className="texto text-4xl mt-4 text-gray-50 w-[195px] mx-auto">blueArg</h2>
            <hr className="opacity-10"></hr>
            <div className="flex mt-4 w-52 m-auto">
              <a className="w-8 m-auto " href="https://www.google.com.ar"></a>
              <a className="w-8 m-auto" href="https://www.google.com.ar"></a>
              <a className="w-8 m-auto" href="https://www.google.com.ar"></a>
            </div>
          </div>
        </section>

        <article className="w-full p-4 justify-center relative">
          <h1 className="texto2 w-2/3 text-3xl text-center m-auto text-white">
            Cotizaciones y noticias<strong> en tiempo real</strong>
            <span className="m-0 p-0 texto2 text-3xl text-[#68e0f0]">.-</span>
          </h1>
          <h4 className="w-2/3 text-start text-xl text-gray-400 m-auto mt-3">Practica tu trading y dale seguimiento sin la necesidad de crearte una cuenta.</h4>
          <div className="w-96 flex justify-center mx-auto relative p-0 m-0 h-52">
            <img className="w-[320px] mx-auto mt-0 absolute" src={stocks} />
            <img className="w-[70px] animacion-subir-bajar mx-auto absolute bottom-0 right-10" src={stocksup} />
          </div>
        </article>
      </header>
      <div className="flex h-auto justify-center w-full mt-4">
        <h1 className="skills mx-auto p-0 border-b-0 px-3 text-[#68e0f0]">
          NOT<span className="text-white">IC</span>IAS
        </h1>
      </div>
      <section className="border-solid border-opacity-20 backk border h-[259px]  border-[#7e7e7e] bg-[#202020] rounded-lg mx-5 flex">
        <button className="bg-gray-600 opacity-50 rounded-r-none text-2xl p-2 border border-opacity-25 border-gray-600" onClick={() => pageNews("back")}>
          &lt;
        </button>
        {news && news.articles && news.articles.slice((page - 1) * newsPerPage, page * newsPerPage).map((article, index) => <Card key={index} author={article.author} title={article.title} url={article.url} />)}

        <button className="bg-gray-600 opacity-50 rounded-l-none text-2xl p-2 border border-opacity-25 border-gray-600 ms-auto" onClick={() => pageNews("next")}>
          &gt;
        </button>
      </section>
      <Footer />
    </>
  );
}

export default App;

import React, { useEffect, useState, useRef } from "react";
import "./pages/App.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { createChart } from "lightweight-charts";

function Graficos() {
  const [weather, setWeather] = useState();
  const [dolar, setDolar] = useState();
  const [cripto, setCripto] = useState();
  const [btc, setBtc] = useState([]);

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const lineSeriesRef = useRef(null);

  useEffect(() => {
    fetchBitcoinData();
    fetchCripto();
  }, []);

  useEffect(() => {
    if (btc.Data && btc.Data.Data && btc.Data.Data.length > 0) {
      initializeChart();
    }
  }, [btc]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBitcoinData();
    }, 5000); // 5000 milisegundos = 5 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []);

  const fetchBitcoinData = async () => {
    const coinSymbol = "BTC"; // Bitcoin
    const toCurrency = "USD"; // Moneda de cotización (Dólar estadounidense en este caso)
    const limit = 60; // Número de puntos de datos que deseas obtener

    try {
      const url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=${coinSymbol}&tsym=${toCurrency}&limit=${limit}`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("La solicitud no se completó con éxito");
      }

      const data = await response.json();

      if (data && data.Data && data.Data.Data && data.Data.Data.length > 0) {
        setBtc(data);
      } else {
        console.error("Los datos no tienen la estructura esperada.");
      }
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    }
  };

  const initializeChart = () => {
    const btcData = btc.Data.Data; // Accede a la propiedad "Data" del objeto "btc"
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight, // Establece la altura según tus necesidades
    });

    const lineSeries = chart.addLineSeries();
    const currentTime = Date.now();
    const btcc = [];

    for (let i = 0; i < btcData.length; i++) {
      if (i < btcData.length) {
        const time = new Date(btcData[i].time).getTime(); // 1 minuto = 60,000 milisegundos
        const value = btcData[i].close; // Obtén el valor "close" del objeto actual
        btcc.push({ time, value });
      }
    }
    const sortedBtcc = btcc.sort((a, b) => a.time - b.time);

    // Agrega datos al gráfico (reemplaza esto con tus datos)
    lineSeries.setData(sortedBtcc); // No es necesario envolver btcc en un arreglo adicional
    chartRef.current = chart;
    lineSeriesRef.current = lineSeries;
  };

  const fetchCripto = async () => {
    try {
      const limit = 6;

      const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=${limit}&tsym=USD`;

      const response = await fetch(url, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCripto(data.Data);
      console.log(data);
      // Aquí puedes manejar los datos según tus necesidades
    } catch (error) {
      console.error("Hubo un problema con la solicitud:", error);
    }
  };

  const fetchDolar = async () => {
    const url = "https://dolarapi.com/v1/dolares";
    const options = { method: "GET", headers: { Accept: "application/json" } };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setDolar(data);
      console.log(dolar);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (value) => {
    return Number(value).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  return (
    <>
      <NavBar />
      <header>
        <h1 className="mt-16 text-4xl">BTC PRICE</h1>
        <p>
          <em>Last 60min</em>
        </p>
      </header>
      <main className="w-full flex justify-center mt-12">
        <div className="overflow-hidden h-[200px] w-[430px] mx-auto rounded-lg" ref={chartContainerRef}></div>
      </main>
      <section className="mt-4 p-2">
        <button className="bg-green-500 w-36 h-12 text-xl me-2 hover:bg-green-600 hover:text-white">LONG</button>
        <button className="bg-red-500 w-36 h-12 text-xl ms-2 hover:bg-red-600 hover:text-white">SHORT</button>
      </section>
      <div className="border rounded-md p-2 m-2">
        <h1>STATS:</h1>
      </div>
      <Footer />
    </>
  );
}

export default Graficos;

import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./Graficos.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import { ChartComponent } from "../ChartComponent";

function Graficos() {
  const [operaciones, setOperaciones] = useState([]);
  const [btc, setBtc] = useState([]);
  const [data, setData] = useState([]);
  const [apalancamiento, setApalancamiento] = useState(2);
  const [fondo, setFondo] = useState(5000);
  const [monto, setMonto] = useState();

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const lineSeriesRef = useRef(null);

  useEffect(() => {
    fetchBitcoinData();
  }, []);

  const initializeChart = () => {
    if (btc && btc.length > 0) {
      const btcc = [];
      const currentTime = Date.now();
      for (let i = 0; i < btc.length; i++) {
        const time = new Date(btc[i].time).getTime(); // 1 minuto = 60,000 milisegundos
        const value = btc[i].close; // Obtén el valor "close" del objeto actual
        btcc.push({ time, value });
      }
      const sortedBtcc = btcc.sort((a, b) => a.time - b.time);
      setData(sortedBtcc);
    }
  };

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
      const btccc = data.Data.Data;
      if (btccc && btccc.length > 0) {
        setBtc(btccc);
      } else {
        console.error("Los datos no tienen la estructura esperada.");
      }
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
    }
  };

  useEffect(() => {
    if (btc && btc.length > 0) {
      initializeChart();
      updatePrices();
    }
  }, [btc]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchBitcoinData();
    }, 2500); // 5000 milisegundos = 5 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => {
      clearInterval(interval);
    };
  }, []);

  const short = () => {
    if (monto > 0) {
      const today = new Date();
      const fecha = today.toLocaleString();
      const shortArray = {
        fecha,
        par: "BTC/USDT",
        tipo: "SHORT",
        precio: btc[60].close,
        monto: monto,
        apalancamiento: apalancamiento,
        total: (btc[60].close / btc[60].close) * monto * 0.99 * apalancamiento,
        porc: -0.01,
      };
      setOperaciones(prev => [...prev, shortArray]);
      setFondo(fondo - monto);
      setMonto("");
    }
  };

  const long = () => {
    if (monto > 0) {
      const today = new Date();
      const fecha = today.toLocaleString();
      const shortArray = {
        fecha,
        par: "BTC/USDT",
        tipo: "LONG",
        precio: btc[60].close,
        monto: monto,
        apalancamiento: apalancamiento,
        total: (btc[60].close / btc[60].close) * monto * 0.99 * apalancamiento,
        porc: -0.01,
      };
      setOperaciones(prev => [...prev, shortArray]);
      setFondo(fondo - monto);
      setMonto("");
    }
  };

  const handleChangeMonto = e => {
    const value = parseFloat(e.target.value);
    setMonto(value);
  };

  function updatePrices() {
    const newState = operaciones.map(objeto => ({
      ...objeto,
      total: (
        (btc[60].close / objeto.precio) *
        apalancamiento *
        objeto.monto
      ).toFixed(3),
      porc: (objeto.total / (objeto.monto * apalancamiento) - 1).toFixed(4),
    }));
    console.log(operaciones);
    setOperaciones(newState);
  }

  return (
    <main>
      <NavBar />
      <div className="md:w-[900px] mt-8 mx-auto px-2">
        <div className="mt-4">
          <h1 className="text-4xl font-semibold text-gray-300">BTC PRICE</h1>
          <p>
            <em>Last 60min</em>
          </p>
        </div>
        <div className="mx-auto mt-8 px-2">
          <ChartComponent data={data} />
        </div>
        <div className="w-full max-w-[400px] border rounded-lg p-2 mx-auto border-gray-600 border-opacity-70 my-4">
          <div className="flex justify-between">
            <p className="text-start text-gray-400 p-1">Isolated - Market</p>
            <p className="text-start  text-sm p-2 text-gray-300">
              Fondos: {fondo} USDT
            </p>
          </div>
          <p className="p-1 text-start">Apalancamiento:</p>
          <div className="flex justify-between p-1">
            <button
              className={
                apalancamiento === 2
                  ? "active w-12 flex text-center justify-center"
                  : "w-12 flex text-center justify-center"
              }
              onClick={() => setApalancamiento(2)}>
              2x
            </button>
            <button
              className={
                apalancamiento === 5
                  ? "active w-12 flex text-center justify-center"
                  : "w-12 flex text-center justify-center"
              }
              onClick={() => setApalancamiento(5)}>
              5x
            </button>
            <button
              className={
                apalancamiento === 10
                  ? "active w-12 flex text-center justify-center"
                  : " w-12 flex text-center justify-center"
              }
              onClick={() => setApalancamiento(10)}>
              10x
            </button>
            <button
              className={
                apalancamiento === 20
                  ? "active w-12 flex text-center justify-center"
                  : "w-12 flex text-center justify-center"
              }
              onClick={() => setApalancamiento(20)}>
              20x
            </button>
            <button
              className={
                apalancamiento === 50
                  ? "active w-12 flex text-center justify-center"
                  : "w-12 flex text-center justify-center"
              }
              onClick={() => setApalancamiento(50)}>
              50x
            </button>
          </div>
          <div className="flex w-full justify-center">
            <input
              className="rounded-md relative p-2 ms-1 mt-2 w-full"
              type="number"
              onChange={handleChangeMonto}
              value={monto}
              placeholder="USDT"
              pattern="[0-9]*"
              required></input>
          </div>
          <section className="mt-2 p-1 flex justify-between">
            <button
              className="bg-green-500 w-36 h-12 text-xl  hover:bg-green-600 hover:text-white mx-1"
              onClick={() => long()}>
              LONG
            </button>
            <button
              className="bg-red-500 w-36 h-12 text-xl  hover:bg-red-600 hover:text-white mx-1"
              onClick={() => short()}>
              SHORT
            </button>
          </section>
        </div>

        <div className="border rounded-md p-2 m-auto flex justify-center overflow-x-auto overflow-y-auto max-h-[500px]">
          <table className="min-w-[630px]">
            <thead>
              <tr>
                <th
                  colSpan="9"
                  className="w-ful text-center h-10 border-b-2">
                  Trade history:
                </th>
              </tr>
              <tr className="h-2"></tr>
              <tr>
                <th>Date</th>
                <th>Pair</th>
                <th>Typo</th>
                <th>Price</th>
                <th>USDT</th>
                <th>Lever.</th>
                <th>Total</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
              {operaciones.length > 0
                ? operaciones.map((object, index) => (
                    <tr key={index}>
                      <td className="px-2">{object.fecha}</td>
                      <td className="px-2">{object.par}</td>
                      <td
                        className={
                          object.tipo === "SHORT"
                            ? "text-red-500 px-2"
                            : "text-green-500 px-2"
                        }>
                        {object.tipo}
                      </td>
                      <td className="px-2">{object.precio}</td>
                      <td className="px-2">{object.monto}</td>
                      <td className="px-2">{object.apalancamiento}x</td>
                      <td
                        className={
                          object.total < object.monto * apalancamiento
                            ? "text-red-500 px-2"
                            : "text-green-500 px-2"
                        }>
                        {object.total}
                      </td>
                      <td
                        className={
                          object.porc < 0
                            ? "px-2 text-red-500"
                            : "px-2 text-green-500"
                        }>
                        {object.porc}%
                      </td>
                      <td className="px-2">
                        <button className="flex m-2 border-white">CLOSE</button>
                      </td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Graficos;

import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import NavBar from "../NavBar";
import Footer from "../Footer";

function Cotizaciones() {
  const [weather, setWeather] = useState();
  const [dolar, setDolar] = useState();
  const [cripto, setCripto] = useState();

  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const lineSeriesRef = useRef(null);

  useEffect(() => {
    fetchDolar();
    fetchCripto();
  }, []);

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
      <header className="grid sm:grid-cols-2 mt-4 m-0 p-4">
        <div className="border border-gray-700 border-opacity-50 m-auto rounded-lg bg-zinc-800 mt-4">
          <table className="w-96 text-start border border-collapse rounded-lg mx-auto overflow-hidden">
            <thead className="border border-gray-700 border-opacity-50">
              <tr>
                <th colspan="2" className="text-3xl p-2">
                  DOLAR
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 flex">
                  <img className="w-[30px] me-3" src={`SRC/assets/dolar.png`} /> Dolar oficial
                </td>
                <td className="p-4">{dolar && formatCurrency(dolar[0].venta)}</td>
              </tr>
              <tr>
                <td className="p-4 flex">
                  {" "}
                  <img className="w-[30px] me-3" src={`SRC/assets/dolar.png`} />
                  Dolar blue
                </td>
                <td className="p-4">{dolar && formatCurrency(dolar[1].venta)}</td>
              </tr>
              <tr>
                <td className="p-4 flex">
                  {" "}
                  <img className="w-[30px] me-3" src={`SRC/assets/dolar.png`} />
                  Dolar bolsa
                </td>
                <td className="p-4">{dolar && formatCurrency(dolar[2].venta)}</td>
              </tr>
              <tr>
                <td className="p-4 flex">
                  <img className="w-[30px] me-3" src={`SRC/assets/dolar.png`} />
                  Dolar CCL
                </td>
                <td className="p-4">{dolar && formatCurrency(dolar[3].venta)}</td>
              </tr>
              <tr>
                <td className="p-4 flex">
                  <img className="w-[30px] me-3" src={`SRC/assets/dolar.png`} />
                  Dolar solidario
                </td>
                <td className="p-4">{dolar && formatCurrency(dolar[4].venta)}</td>
              </tr>
              <tr>
                <td className="p-4 flex">
                  <img className="w-[30px] me-3" src={`SRC/assets/dolar.png`} />
                  Dolar mayorista
                </td>
                <td className="p-4">{dolar && formatCurrency(dolar[5].venta)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-700 border-opacity-50 m-auto rounded-lg bg-zinc-800 mt-4">
          <table className="w-96 text-start border border-collapse rounded-lg mx-auto overflow-hidden h-[391px]">
            <thead className="border border-gray-700 border-opacity-50">
              <tr>
                <th colspan="2" className="text-3xl p-2">
                  CRIPTO
                </th>
              </tr>
            </thead>
            <tbody>
              {cripto &&
                cripto.map((object, index) => (
                  <tr key={index}>
                    <td className="p-4 flex">
                      <img className="w-[30px] me-3" src={`SRC/assets/${object.CoinInfo.Name}.png`} />
                      {object.CoinInfo.FullName}
                    </td>
                    <td className={`p-4 ${object.DISPLAY.USD.CHANGEPCTDAY < 0 ? "text-red-500" : "text-green-500"}`}>US{object.DISPLAY.USD.PRICE}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </header>
      <Footer />
    </>
  );
}

export default Cotizaciones;

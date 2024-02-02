import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import NavBar from "../NavBar";
import Footer from "../Footer";
import dolarImg from "../assets/dolar.png";

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
      console.log(response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setCripto(data.Data);
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
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = value => {
    return Number(value).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
    });
  };

  return (
    <main>
      <NavBar />
      <div className="flex flex-wrap mt-8 md:w-[900px]  mx-auto ">
        <div className="border border-gray-700 border-opacity-50 m-auto  rounded-lg bg-zinc-800 mt-4">
          <table className="text-start border border-collapse rounded-lg mx-auto overflow-hidden min-w-[290px]">
            <thead className="border border-gray-700 border-opacity-50">
              <tr>
                <th
                  colSpan="2"
                  className="text-3xl p-2 items-center">
                  DOLAR
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 flex items-center">
                  <img
                    className="w-[25px] me-3"
                    src={dolarImg}
                  />{" "}
                  Dolar oficial
                </td>
                <td className="p-4 items-center">
                  {dolar && formatCurrency(dolar[0].venta)}
                </td>
              </tr>
              <tr>
                <td className="p-4 flex items-center">
                  {" "}
                  <img
                    className="w-[25px] me-3"
                    src={dolarImg}
                  />
                  Dolar blue
                </td>
                <td className="p-4 items-center">
                  {dolar && formatCurrency(dolar[1].venta)}
                </td>
              </tr>
              <tr>
                <td className="p-4 flex items-center">
                  {" "}
                  <img
                    className="w-[25px] me-3"
                    src={dolarImg}
                  />
                  Dolar bolsa
                </td>
                <td className="p-4">
                  {dolar && formatCurrency(dolar[2].venta)}
                </td>
              </tr>
              <tr>
                <td className="p-4 flex items-center">
                  <img
                    className="w-[25px] me-3"
                    src={dolarImg}
                  />
                  Dolar CCL
                </td>
                <td className="p-4 items-center">
                  {dolar && formatCurrency(dolar[3].venta)}
                </td>
              </tr>
              <tr>
                <td className="p-4 flex items-center">
                  <img
                    className="w-[25px] me-3"
                    src={dolarImg}
                  />
                  Dolar solidario
                </td>
                <td className="p-4">
                  {dolar && formatCurrency(dolar[4].venta)}
                </td>
              </tr>
              <tr>
                <td className="p-4 flex items-center">
                  <img
                    className="w-[25px] me-3"
                    src={dolarImg}
                  />
                  Dolar mayorista
                </td>
                <td className="p-4">
                  {dolar && formatCurrency(dolar[5].venta)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="border border-gray-700 border-opacity-50 m-auto rounded-lg bg-zinc-800 mt-4">
          <table className="text-start border border-collapse rounded-lg mx-auto overflow-hidden h-[391px] min-w-[290px]">
            <thead className="border border-gray-700 border-opacity-50">
              <tr>
                <th
                  colSpan="2"
                  className="text-3xl p-2">
                  CRIPTO
                </th>
              </tr>
            </thead>
            <tbody>
              {cripto &&
                cripto.map((object, index) => (
                  <tr key={index}>
                    <td className="p-4 flex">
                      <img
                        className="w-[25px] me-3"
                        src={`https://www.cryptocompare.com${object.CoinInfo.ImageUrl}`}
                      />
                      {object.CoinInfo.FullName}
                    </td>
                    <td
                      className={`p-4 ${
                        object.DISPLAY.USD.CHANGEPCTDAY < 0
                          ? "text-red-500"
                          : "text-green-500"
                      }`}>
                      US{object.DISPLAY.USD.PRICE}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default Cotizaciones;

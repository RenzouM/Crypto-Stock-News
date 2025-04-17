# BlueArg 💱

BlueArg es una aplicación web que proporciona información en tiempo real sobre diferentes tipos de cotizaciones del dólar en Argentina y las principales criptomonedas del mercado.

## Características 🚀

### Cotizaciones de Dólar 💵

- Dólar Oficial
- Dólar Blue
- Dólar Bolsa
- Dólar CCL
- Dólar Solidario
- Dólar Mayorista

### Criptomonedas ₿

- Muestra las 6 criptomonedas principales por capitalización de mercado
- Precios en tiempo real en USD
- Indicador visual de variación de precio (verde/rojo)
- Imágenes de las criptomonedas

## Tecnologías Utilizadas 🛠️

- React
- Vite
- Tailwind CSS
- APIs:
  - DolarAPI (https://dolarapi.com/)
  - CryptoCompare API (https://min-api.cryptocompare.com/)

## Instalación 📦

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/blueArg.git
```

2. Instala las dependencias:

```bash
cd blueArg
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Uso 💻

La aplicación mostrará automáticamente las cotizaciones actualizadas del dólar y las criptomonedas. Los datos se actualizan cada vez que se recarga la página.

## APIs Utilizadas 🌐

### DolarAPI

- Endpoint: `https://dolarapi.com/v1/dolares`
- Proporciona cotizaciones de diferentes tipos de dólar en Argentina

### CryptoCompare

- Endpoint: `https://min-api.cryptocompare.com/data/top/mktcapfull`
- Proporciona información sobre las principales criptomonedas

## Contribuir 🤝

Las contribuciones son bienvenidas. Para cambios importantes, por favor abre primero un issue para discutir qué te gustaría cambiar.

## Licencia 📄

[MIT](https://choosealicense.com/licenses/mit/)

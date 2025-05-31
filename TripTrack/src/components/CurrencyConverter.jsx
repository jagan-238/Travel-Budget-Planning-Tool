import React, { useEffect, useState } from "react";

const supportedCurrencies = [
  "USD",
  "EUR",
  "INR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CNY",
  "SGD",
];

export default function TravelCurrencyConverter() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);

  // Fetch exchange rates (base USD)
  useEffect(() => {
    setLoading(true);
    fetch("https://open.er-api.com/v6/latest/USD")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch rates");
        return res.json();
      })
      .then((data) => {
        setRates(data.rates);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Conversion logic
  useEffect(() => {
    if (!amount || isNaN(amount)) {
      setConvertedAmount(null);
      return;
    }
    if (!rates[fromCurrency] || !rates[toCurrency]) return;

    // Convert amount to USD first, then to target currency
    const amountInUSD = amount / rates[fromCurrency];
    const converted = amountInUSD * rates[toCurrency];

    setConvertedAmount(converted);
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <>
      <style>{`
        .container {
          max-width: 400px;
          margin: 2rem auto;
          padding: 1.5rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }
        h2 {
          text-align: center;
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.3rem;
          font-weight: 600;
        }
        input, select {
          width: 100%;
          padding: 0.6rem 0.8rem;
          margin-bottom: 1rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          font-size: 1rem;
          box-sizing: border-box;
        }
        .result {
          background-color: #e3f2fd;
          padding: 1rem;
          border-radius: 6px;
          font-weight: 700;
          text-align: center;
          font-size: 1.2rem;
          color: #0d47a1;
          min-height: 2.4rem;
        }
        @media (max-width: 480px) {
          .container {
            margin: 1rem;
            padding: 1rem;
          }
          input, select {
            font-size: 0.9rem;
          }
          .result {
            font-size: 1rem;
          }
        }
      `}</style>

      <div className="container" role="main" aria-live="polite" aria-label="Travel Currency Converter">
        <h2>Travel Currency Converter</h2>

        {loading && <p>Loading exchange rates...</p>}
        {error && <p role="alert" style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <>
            <label htmlFor="amount">Expense Amount</label>
            <input
              id="amount"
              type="number"
              min="0"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              inputMode="decimal"
              aria-describedby="amountHelp"
            />
            <label htmlFor="fromCurrency">Currency Spent In</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
            >
              {supportedCurrencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <label htmlFor="toCurrency">Convert To</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
            >
              {supportedCurrencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>

            <div className="result" aria-live="polite" aria-atomic="true">
              {convertedAmount !== null && !isNaN(convertedAmount)
                ? `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
                : "Enter a valid amount"}
            </div>
          </>
        )}
      </div>
    </>
  );
}

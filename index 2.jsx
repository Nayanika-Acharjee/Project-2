<script>
const { useState, useMemo, useRef, useCallback } = React;

export function CurrencyConverter() {
  const [currency, setCurrency] = useState(1);
  const [startCurrency, setStartCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("USD");
  const [startRate, setStartRate] = useState(1);

  const defaultStartUnit = useRef(null);
  const defaultTargetUnit = useRef(null);

  const currencyRates = {
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 144.3,
    INR:89.89,
  };

  // only recalculates when start currency or amount changes
  const total = useMemo(() => {
    return currency * (currencyRates[targetCurrency] / startRate);
  }, [currency, startRate]);

  const handleStartUnits = useCallback((e) => {
    const unit = e.target.value;
    setStartCurrency(unit);
    setStartRate(currencyRates[unit]);
  }, []);

  const handleTargetUnits = useCallback((e) => {
    const unit = e.target.value;
    setTargetCurrency(unit);
  }, []);

  const resetAll = useCallback(() => {
    setCurrency(1);
    setStartCurrency("USD");
    setTargetCurrency("USD");
    setStartRate(1);
    defaultStartUnit.current.selectedIndex = 0;
    defaultTargetUnit.current.selectedIndex = 0;
  }, []);

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <p>Convert {startCurrency} to {targetCurrency}</p>

      <input className="select-field"
        type="number"
        value={currency}
        onChange={(e) => setCurrency(Number(e.target.value))}
      />

      <p>Start Currency</p>
      <select className="select-field" onChange={handleStartUnits} ref={defaultStartUnit} >
        {Object.keys(currencyRates).map((code) => (
          <option key={code} value={code}>{code}</option>
        ))}
      </select>

      <p>Target Currency</p>
      <select className="select-field" onChange={handleTargetUnits} ref={defaultTargetUnit}>
        {Object.keys(currencyRates).map((code) => (
          <option key={code} value={code} name={code}>{code}</option>
        ))}
      </select>

      <p className="total">
        Converted amount: {total.toFixed(2)} {targetCurrency}
      </p>

      <button className="reset" onClick={resetAll}>Reset</button>
    </div>
  );
}
</script>

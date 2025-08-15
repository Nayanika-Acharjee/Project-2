const { useState, useEffect, useRef } = React;

function OTPGenerator() {
  const [otp, setOtp] = useState("Click 'Generate OTP' to get a code");
  const [timerText, setTimerText] = useState(""); // empty => no <p> initially
  const [isDisabled, setIsDisabled] = useState(false);
  const timerRef = useRef(null);

  const startCountdown = () => {
    let t = 5;
    setTimerText(`Expires in: ${t} seconds`);

    timerRef.current = setInterval(() => {
      t -= 1;
      if (t > 0) {
        setTimerText(`Expires in: ${t} seconds`);
      } else {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setTimerText("OTP expired. Click the button to generate a new OTP.");
        setIsDisabled(false); 
      }
    }, 1000);
  };

  const handleGenerate = () => {
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(String(newOtp));
    setIsDisabled(true);
    startCountdown();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">{otp}</h2>
      
      {timerText && <p id="otp-timer">{timerText}</p>}
      <button
        id="generate-otp-button"
        onClick={handleGenerate}
        disabled={isDisabled}
      >
        Generate OTP
      </button>
    </div>
  );
}

export { OTPGenerator };



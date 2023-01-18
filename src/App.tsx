import React, { useEffect, useState } from "react";

function App() {
  const [ebikeFactor, setEbikeFactor] = useState("");
  const [carE85Factor, setCarE85Factor] = useState("");
  const [carDieselFactor, setCarDieselFactor] = useState("");
  const [carPetrolFactor, setCarPetrolFactor] = useState("");
  const [carGPLFactor, setCarGPLFactor] = useState("");
  const [motorcycleFactor, setMotorcycleFactor] = useState("");
  const [escooterFactor, setEscooterFactor] = useState("");
  const [carBatteryFactor, setCarBatteryFactor] = useState("");
  const [carHybridFactor, setCarHybridFactor] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&query=bike", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&query=E85", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&uuid=245cd90b-2723-40d6-8404-96c7da64635b", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&uuid=5c0ddba5-89d8-439b-aa8f-e4dcaf1a4519", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&query=lpg", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&uuid=91fc1718-88a1-4793-98c3-54ec3e6e63f4", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&query=scooter", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&uuid=3d7632d5-bb5f-4d00-b991-8c0db854f45f", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      }),
      fetch("https://beta3.api.climatiq.io/search?category=vehicles&region=FR&source=ADEME&uuid=db31183e-4bda-4900-a7c2-4f59b5dd1b9e", {
        method: 'GET',
        headers: {
          "Authorization": "Bearer PQSAGMSDKV4S0XNA9DC599PWFCSS"
        }
      })
    ])
      .then(responses => {
        return Promise.all(responses.map(res => {return res.json()}))
      })
      .then(data => {
        setEbikeFactor(data[0].results[0].factor);
        setCarE85Factor(data[1].results[0].factor);
        setCarDieselFactor(data[2].results[0].factor);
        setCarPetrolFactor(data[3].results[0].factor);
        setCarGPLFactor(data[4].results[0].factor);
        setMotorcycleFactor(data[5].results[0].factor);
        setEscooterFactor(data[6].results[0].factor);
        setCarBatteryFactor(data[7].results[0].factor);
        setCarHybridFactor(data[8].results[0].factor);
      })
      .catch(error => console.log('Error while fetching:', error))
  }, [])

  return (
    <div className="App">
      <p>Bike factor = 0</p>
      <p>Electric Bike factor = {ebikeFactor}</p>
      <p>E85 factor = {carE85Factor}</p>
      <p>Diesel factor = {carDieselFactor}</p>
      <p>Petrol factor = {carPetrolFactor}</p>
      <p>GPL factor = {carGPLFactor}</p>
      <p>Moto factor = {motorcycleFactor}</p>
      <p>Electric scooter factor = {escooterFactor}</p>
      <p>Electric car factor = {carBatteryFactor}</p>
      <p>Hybrid car factor = {carHybridFactor}</p>
    </div>
  );
}

export default App;

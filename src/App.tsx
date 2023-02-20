import React, { useEffect, useState, createContext } from "react";
import OldVehicle from "./components/OldVehicle";
import NewVehicle from "./components/NewVehicle";
import EstimateEmissions from "./components/EstimateEmissions";

export interface IFactors {
  bike: number,
  ebike: number,
  e85: number,
  diesel: number,
  petrol: number,
  gpl: number,
  motorcycle: number,
  escooter: number,
  ecar: number,
  hybridcar: number
}

export interface IDatas {
  vehicle: string,
  emissionFactor: number,
  consommationFactor: number,
  distance: number,
  daysPerWeek: number,
  consommation: number,
  price: number
}

export const AppContext = createContext([{} as IFactors, {} as IFactors, {} as IFactors]);

function App() {
  const [emissionFactors, setEmissionFactors] = useState<IFactors>({
    bike: 0,
    ebike: 0,
    e85: 0,
    diesel: 0,
    petrol: 0,
    gpl: 0,
    motorcycle: 0,
    escooter: 0,
    ecar: 0,
    hybridcar: 0
  });
  const [oldVehicleData, setOldVehicleData] = useState<IDatas>({ vehicle: "bike", emissionFactor: 0, consommationFactor: 0, distance: 0, daysPerWeek: 0, consommation: 0, price: 0 });
  const [newVehicleData, setNewVehicleData] = useState<IDatas>({ vehicle: "bike", emissionFactor: 0, consommationFactor: 0, distance: 0, daysPerWeek: 0, consommation: 0, price: 0 });
  const [isBoxChecked, setIsBoxChecked] = useState<boolean>(false);

  const consommationPer100: IFactors = {
    bike: 0,
    ebike: 0.72,
    e85: 8.50,
    diesel: 5,
    petrol: 6.80,
    gpl: 7.50,
    motorcycle: 5.50,
    escooter: 6,
    ecar: 15,
    hybridcar: 5
  };
  const fuelPrices: IFactors = {
    bike: 0,
    ebike: 0.174,
    e85: 1.1,
    diesel: 1.85,
    petrol: 1.85,
    gpl: 0.9,
    motorcycle: 1.85,
    escooter: 0.174,
    ecar: 0.174,
    hybridcar: 1.85
  };

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
        return Promise.all(responses.map(res => { return res.json() }))
      })
      .then(data => {
        setEmissionFactors(prevState => {
          return {
            ...prevState,
            ebike: data[0].results[0].factor,
            e85: data[1].results[0].factor,
            diesel: data[2].results[0].factor,
            petrol: data[3].results[0].factor,
            gpl: data[4].results[0].factor,
            motorcycle: data[5].results[0].factor,
            escooter: data[6].results[0].factor,
            ecar: data[7].results[0].factor,
            hybridcar: data[8].results[0].factor
          };
        });
      })
      .catch(error => console.log('Error while fetching:', error))
  }, [])

  return (
    <div className="App">
      <header>
        <h1>Bike to work : faire du vélo pour faire des économies !</h1>
      </header>
      <AppContext.Provider value={[emissionFactors, consommationPer100, fuelPrices]}>
        <div className="body-container">
          <OldVehicle setOldVehicleData={setOldVehicleData} />
          <NewVehicle setNewVehicleData={setNewVehicleData} isBoxChecked={isBoxChecked} setIsBoxChecked={setIsBoxChecked} />
          <EstimateEmissions oldVehicleData={oldVehicleData} newVehicleData={newVehicleData} isBoxChecked={isBoxChecked} />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;

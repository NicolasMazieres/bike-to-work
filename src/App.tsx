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
  distance: number,
  daysPerWeek: number
}

export const AppContext = createContext({} as IFactors);

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
  const [oldVehicleData, setOldVehicleData] = useState<IDatas>({vehicle: "bike", emissionFactor: 0, distance:0, daysPerWeek:0});
  const [newVehicleData, setNewVehicleData] = useState<IDatas>({vehicle: "bike", emissionFactor: 0, distance:0, daysPerWeek:0});
  const [isBoxChecked, setIsBoxChecked] = useState(false);

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
      <AppContext.Provider value={emissionFactors}>
        <OldVehicle setOldVehicleData={setOldVehicleData} />
        <NewVehicle setNewVehicleData={setNewVehicleData} isBoxChecked={isBoxChecked} setIsBoxChecked={setIsBoxChecked}/>
        <EstimateEmissions oldVehicleData={oldVehicleData} newVehicleData={newVehicleData} isBoxChecked={isBoxChecked} />
      </AppContext.Provider>
    </div>
  );
}

export default App;

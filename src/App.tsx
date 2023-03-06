import React, { useState, createContext } from "react";
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
  motorcyclesmall: number,
  motorcyclebig: number,
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
  const [oldVehicleData, setOldVehicleData] = useState<IDatas>({ vehicle: "bike", emissionFactor: 0, consommationFactor: 0, distance: 0, daysPerWeek: 0, consommation: 0, price: 0 });
  const [newVehicleData, setNewVehicleData] = useState<IDatas>({ vehicle: "bike", emissionFactor: 0, consommationFactor: 0, distance: 0, daysPerWeek: 0, consommation: 0, price: 0 });
  const [isBoxChecked, setIsBoxChecked] = useState<boolean>(false);


  const emissionFactors: IFactors = {
    bike: 0,
    ebike: 0.0109,
    e85: 0.147,
    diesel: 0.212,
    petrol: 0.223,
    gpl: 0.217,
    motorcyclesmall: 0.0763,
    motorcyclebig: 0.191,
    escooter: 0.0249,
    ecar: 0.103,
    hybridcar: 0.183
  };
  const consommationPer100: IFactors = {
    bike: 0,
    ebike: 0.72,
    e85: 8.50,
    diesel: 5,
    petrol: 6.80,
    gpl: 7.50,
    motorcyclesmall: 3,
    motorcyclebig: 5.5,
    escooter: 1.4,
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
    motorcyclesmall: 1.85,
    motorcyclebig: 1.85,
    escooter: 0.174,
    ecar: 0.174,
    hybridcar: 1.85
  };

  return (
    <div className="App">
      <header>
        <h1>BIKE TO WORK
          <hr />
            Des économies pour vous et pour la planète
        </h1>
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

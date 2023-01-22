import React, { useEffect, useState } from "react";

function Vehicle() {

    return (
        <div>
            <label htmlFor="vehicle-select">Choose a vehicle:</label>
            <select name="vehicles" id="vehicle-select">
                <option value="">--Please choose an option--</option>
                <option value="bike">Vélo</option>
                <option value="ebike">Vélo électrique</option>
                <option value="carE85">Voiture (Superéthanol E85)</option>
                <option value="cardiesel">Voiture (Diesel)</option>
                <option value="carpetrol">Voiture (Essence)</option>
                <option value="carGPL">Voiture (GPL)</option>
                <option value="motorcycle">Moto/Scooter</option>
                <option value="escooter">Scooter électrique</option>
                <option value="ecar">Voiture électrique</option>
                <option value="hybridcar">Voiture hybride</option>
            </select>
        </div>
    )
}

export default Vehicle;
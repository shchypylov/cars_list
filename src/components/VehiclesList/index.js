import {useEffect, useState} from "react";
import {Button, ListGroup} from "react-bootstrap";

import {capitalize} from "../../utils";

import './style.css'

const VehiclesList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchVehicles = async () => {
            const {cars} = await fetch('https://auto1-mock-server.herokuapp.com/api/cars?sort=asc&page=1')
                .then(data => data.json())

            setCars(cars)
            console.log(' --- ', cars);
        }


        fetchVehicles()
    }, [])
    return (
        <div>
            <h1>Available cars</h1>
            <h3>Showing 10 of 100 results</h3>

            <ListGroup>
                {cars.map(c => (
                    <ListGroup.Item key={c.stockNumber} className='d-flex vehicle-item'>
                        <img src={c.pictureUrl} alt="carImage" className='vehicle-item__image me-3'/>
                        <div className='d-flex vehicle-item__info flex-column'>
                            <p className='vehicle-item__title mb-1'>
                                <strong>{c.manufacturerName}</strong>
                            </p>
                            <p className='vehicle-item__subtitle mb-1'>
                                Stock #
                                ${c.stockNumber} - {c.mileage.number} {c.mileage.unit.toUpperCase()} - {c.fuelType} - {capitalize(c.color)}
                            </p>
                            <Button variant="link" className='me-auto'>View details</Button>
                        </div>
                    </ListGroup.Item>

                ))}
            </ListGroup>
        </div>
    );
};

export default VehiclesList;

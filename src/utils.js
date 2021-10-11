export const capitalize = (str) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;

export const getCarDescription = (car) => `Stock # ${car.stockNumber} -
            ${car.mileage.number} ${car.mileage.unit.toUpperCase()} - 
            ${car.fuelType} - ${capitalize(car.color)}`;

export const reportError = (e) => {
  console.error(`Error is occurred. Message is: ${e.message}`);
};

export const getLocalStorageCars = () => {
  const localStorageCars = localStorage.getItem("favouriteCars");
  return localStorageCars ? JSON.parse(localStorageCars) : {};
};

export const setLocalStorageCars = (cars) => {
  localStorage.setItem("favouriteCars", JSON.stringify(cars));
};

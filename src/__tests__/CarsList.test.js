import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

import CarsList from "../components/CarsList";

const server = setupServer(
  rest.get(
    "https://auto1-mock-server.herokuapp.com/api/cars",
    (req, res, ctx) => {
      return res(
        ctx.json({
          cars: [
            {
              stockNumber: 52405,
              manufacturerName: "Fiat",
              modelName: "Idea",
              color: "white",
              mileage: {
                number: 109260,
                unit: "km",
              },
              fuelType: "Petrol",
              pictureUrl:
                "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
            },
            {
              stockNumber: 64020,
              manufacturerName: "Fiat",
              modelName: "Uno",
              color: "white",
              mileage: {
                number: 117616,
                unit: "km",
              },
              fuelType: "Petrol",
              pictureUrl:
                "https://auto1-js-task-api--mufasa71.repl.co/images/car.svg",
            },
          ],
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("Component should render with spinner", () => {
  render(
    <BrowserRouter>
      <CarsList />
    </BrowserRouter>
  );

  const spinner = screen.getByText("Loading...");

  expect(spinner).toBeInTheDocument();
});

test("Cars data should be shown after fetch", async () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <CarsList />
    </BrowserRouter>
  );

  await waitFor(() => {
    const items = getAllByTestId("carListItem");

    expect(items[0]).toBeInTheDocument();
  });

  const items = getAllByTestId("carListItem");
  expect(items).toHaveLength(2);
});

test("Details button should navigate on car details route", async () => {
  const { getAllByTestId } = render(
    <BrowserRouter>
      <CarsList />
    </BrowserRouter>
  );

  await waitFor(() => {
    const items = getAllByTestId("carListItem");

    expect(items[0]).toBeInTheDocument();
  });

  fireEvent.click(screen.getAllByText("View details")[0]);
  expect(global.location.pathname).toMatch("/cars/52405");
});

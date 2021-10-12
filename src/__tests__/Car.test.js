import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

import Car from "../components/Car";

const STOCK_ID_NUMBER = 52405;

const server = setupServer(
  rest.get(
    `https://auto1-mock-server.herokuapp.com/api/cars/${STOCK_ID_NUMBER}`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          car: {
            stockNumber: STOCK_ID_NUMBER,
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
        })
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ id: STOCK_ID_NUMBER }),
}));

test("Component should render with spinner", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Car />
    </BrowserRouter>
  );

  const loader = getByTestId("loader");

  expect(loader).toBeInTheDocument();
});

test("Car data should be shown", async () => {
  render(
    <BrowserRouter>
      <Car />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByText("Fiat Idea");

    expect(title).toBeInTheDocument();
  });

  const button = screen.getByTestId("saveButton");

  expect(button).toHaveTextContent("Save");
  expect(button).toBeEnabled();
});

test("Favourites button should appear upon Save button click", async () => {
  render(
    <BrowserRouter>
      <Car />
    </BrowserRouter>
  );

  await waitFor(() => {
    const button = screen.getByTestId("saveButton");

    expect(button).toBeInTheDocument();
  });

  const button = screen.getByTestId("saveButton");
  fireEvent.click(button);
  const favouritesListButton = screen.getByTestId("favouritesListButton");
  expect(favouritesListButton).toBeInTheDocument();
});

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

import Filters from "../components/CarFilters";

const server = setupServer(
  rest.get(
    "https://auto1-mock-server.herokuapp.com/api/colors",
    (req, res, ctx) => {
      return res(
        ctx.json({
          colors: [
            "red",
            "blue",
            "green",
            "black",
            "yellow",
            "white",
            "silver",
          ],
        })
      );
    }
  ),
  rest.get(
    "https://auto1-mock-server.herokuapp.com/api/manufacturers",
    (req, res, ctx) => {
      return res(
        ctx.json({
          manufacturers: [
            {
              name: "Audi",
              models: [
                {
                  name: "100",
                },
                {
                  name: "200",
                },
              ],
            },
            {
              name: "BMW",
              models: [
                {
                  name: "1er",
                },
                {
                  name: "2er",
                },
                {
                  name: "3er",
                },
              ],
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

test("Component should render", () => {
  render(<Filters />);

  const submitButton = screen.getByText("Filter");

  expect(submitButton).toBeInTheDocument();
});

test("Color select should change and set proper value", async () => {
  const { getByTestId, getAllByTestId } = render(<Filters />);

  await waitFor(() => {
    const options = getAllByTestId("colorSelectOption");

    expect(options[1]).toBeInTheDocument();
  });
  const options = getAllByTestId("colorSelectOption");

  fireEvent.change(getByTestId("colorSelect"), {
    target: { value: "blue" },
  });
  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeTruthy();
  expect(options[2].value).toBe("blue");
});

test("Manufacturer select should change and set proper value", async () => {
  const { getByTestId, getAllByTestId } = render(<Filters />);

  await waitFor(() => {
    let options = getAllByTestId("manufacturerSelectOption");

    expect(options[1]).toBeInTheDocument();
  });

  fireEvent.change(getByTestId("manufacturerSelect"), {
    target: { value: "bmw" },
  });

  let options = getAllByTestId("manufacturerSelectOption");

  expect(options[0].selected).toBeFalsy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeTruthy();
  expect(options[2].value).toBe("bmw");
});

test("Filters component should render if /colors request fails", async () => {
  server.use(
    rest.get(
      "https://auto1-mock-server.herokuapp.com/api/colors",
      (req, res, ctx) => {
        return res(ctx.status(500));
      }
    )
  );

  const { getAllByTestId } = render(<Filters />);

  await waitFor(() => {
    let options = getAllByTestId("manufacturerSelectOption");

    expect(options[1]).toBeInTheDocument();
  });

  const colorOptions = getAllByTestId("colorSelectOption");

  expect(colorOptions).toHaveLength(1);
});

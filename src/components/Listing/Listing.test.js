import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Listing from "./Listing";
import "@testing-library/jest-dom/extend-expect";

describe("Listing", () => {
  let listing1;
  let listing2;
  let mockFavoriteListing;

  beforeEach(() => {
    mockFavoriteListing = jest.fn();

    listing1 = {
      address: { street: "3607 Navajo St", zip: 80211 },
      area: "lohi",
      area_id: 408,
      details: {
        neighborhood_id: 99125,
        superhost: false,
        seller_source: "kfbr392",
        beds: 3,
        baths: 2.75,
      },
      listing_id: 83331,
      name: "LoHi Heaven",
    };
    listing2 = {
      address: { street: "3349 Zuni St", zip: 80211 },
      area: "lohi",
      area_id: 408,
      details: {
        neighborhood_id: 99125,
        superhost: false,
        seller_source: "kfbr392",
        beds: 5,
        baths: 3,
      },
      listing_id: 411,
      name: "LoHi Bungalow",
    };
  });
  it.skip("should render an Listings component", () => {
    const { getByText, getAllByText, getAllByRole } = render(
      <BrowserRouter>
        <Listing data={listing1} favoriteListing={mockFavoriteListing} />
      </BrowserRouter>
    );
    const header = getByText("LoHi Heaven");
    expect(header).toBeInTheDocument();
    expect(getAllByRole("img", { alt: "LoHi Heaven" }));
    expect(getAllByText("Full Listing!")).toHaveLength(1);
  });

  it.skip("Should test the click of Favorites icon", () => {
    const { getByAltText, getByRole } = render(
      <BrowserRouter>
        <Listing data={listing1} favoriteListing={mockFavoriteListing} />
      </BrowserRouter>
    );

    fireEvent.click(getByAltText("favorite"));
    expect(getByAltText("favorite", { src: "pinkStar.png" }));
    expect(mockFavoriteListing).toHaveBeenCalled();
    // fireEvent.clicl(getByText("Favorites"))
    // expect(window.location.href).toBe("http://localhost/favorites");
    //expect a certain listing to be in the document
    // another event that where you click on favorites, then we check to see if
    //specific listing is in favorites

    fireEvent.click(getByAltText("favorite"));
    expect(getByAltText("favorite", { src: "star-outline.svg" }));
    expect(mockFavoriteListing).toHaveBeenCalled();
  });
});

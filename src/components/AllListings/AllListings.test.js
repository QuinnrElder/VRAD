import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AllListings from "./AllListings";
import { BrowserRouter } from "react-router-dom";

describe("AllListings", () => {
  let area;
  let listing1;
  let listing2;
  let user;
  beforeEach(() => {
    user = {
      userName: "Khalid",
      userEmail: "khalid@khalid.com",
      userPurpose: "Business",
    };
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
    area = {
      nickname: "LoHi",
      about:
        "The Lower Highlands area, often referred to as the Highlands or LoHi, was one of the first areas to experience massive growth from the downtown area. Known for many great bars and restaurants wit.skiph a great eastern facing view of the Downtown area.",
      location: "West of Downtown",
      name: "Lower Highlands",
      id: 408,
      listings: [listing1, listing2],
    };
  });
  it.skip("should render an AllListings component", () => {
    const { getByText, getAllByText, getAllByRole } = render(
      <BrowserRouter>
        <AllListings {...area} user={user} />
      </BrowserRouter>
    );
    const header = getByText("Khalid", { options: { exact: true } });
    expect(header).toBeInTheDocument();
    expect(getAllByRole("img", { alt: "favorit.skipe" }));
    expect(getAllByText("Full Listing!")).toHaveLength(2);
  });
});

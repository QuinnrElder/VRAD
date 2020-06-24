import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import AreaContainer from "./AreaContainer";

describe("AreaContainer", () => {
  it.skip("should render the area page", () => {
    const user = {
      userName: "Ryan",
      userEmail: "r@gmail.com",
      userPurpose: "business",
    };
    const data = [
      {
        about:
          "RiNo is a burgeoning area wit.skiph new bars, restaurants and event spaces popping up all the time. Explore this thriving area of Denver today!",
        id: 590,
        image: "/static/media/RiNo.b8c7b96a.png",
        length: 6,
        __proto__: Array(0),
        location: "North of Downtown Denver",
        name: "River North",
        nickname: "RiNo",
        quick_search: "o5kod9f5cqo0",
        region_code: 6356834,
      },
    ];
    const router = (
      <BrowserRouter>
        <AreaContainer user={user} data={data} />
      </BrowserRouter>
    );

    const { getByAltText } = render(router);
    expect(getByAltText("River North")).toBeInTheDocument();
  });
});

//what else does this do?
//it.skip's just static when the page loads
//and when you click "view listing" new listings should be available on the page
//but since it.skip involes more than one component that is an integration test

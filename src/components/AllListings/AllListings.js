import React from "react";
import "./AllListings.css";
import Listing from "../Listing/Listing";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AllListings = (props) => {
  const { user } = props;
  const individualListings = props.listings.map((listing) => {
    let isFavorite = null;
    const imagePathA = `/repoImages/${listing.listing_id}_a.jpg`;
    props.favoriteListingsID.forEach((id) => {
      if (parseInt(id) === listing.listing_id) {
        isFavorite = true;
      }
    });
    return (
      <Listing
        favorite={isFavorite}
        comingFromFavorites={false}
        
        imageA={imagePathA}
        key={listing["listing_id"]}
        data={listing}
        favoriteListing={props.favoriteListing}
      />
    );
  });

  return (
    <div className="area-container-locations">
      <div className="area-header">
        <h2>
          <Link to="/areas" exact="true">
            Denver Neighborhoods
          </Link>{" "}
          > {props.name}
        </h2>
        <h4 className="personal-greeting">
          Welcome, <span>{user.userName}</span>. Find a great{" "}
          {user.userPurpose === "other" ? "" : <span>{user.userPurpose}</span>}{" "}
          rental in Denver!
        </h4>
      </div>
      <section className="all-listings-container">{individualListings}</section>
    </div>
  );
};

AllListings.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  location: PropTypes.string,
  about: PropTypes.string,
  region_code: PropTypes.number,
  quick_search: PropTypes.string,
  listings: PropTypes.array,
  nickname: PropTypes.string,
  image: PropTypes.string,
  user: PropTypes.object,
  favoriteListingsID: PropTypes.array,
};

export default AllListings;

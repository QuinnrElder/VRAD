import React, { Component } from "react";
import "./App.css";
import Login from "../Login/Login";
import Header from "../Header/Header";
import AreaContainer from "../AreaContainer/AreaContainer";
import caphill from "../../images/CapHill.png";
import lohi from "../../images/LoHi.png";
import parkhill from "../../images/ParkHill.png";
import rino from "../../images/RiNo.png";

import { NavLink, Switch, Route, Redirect } from "react-router-dom";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      areas: [],
      favorites: [],
      error: "",
    };
  }

  componentDidMount = () => {
    const array = [];
    const baseURL = "https://vrad-api.herokuapp.com";
    fetch(`${baseURL}/api/v1/areas`)
      .then((response) => response.json())
      .then((someInfo) => {
        someInfo.areas.map((neighborhood) => {
          return fetch(`${baseURL}${neighborhood.details}`)
            .then((moreInfo) => moreInfo.json())
            .then((singleNeighborhood) => {
              const listingPromises = singleNeighborhood.listings.map(
                (listing) => {
                  return fetch(`${baseURL}${listing}`).then((listingData) =>
                    listingData.json()
                  );
                }
              );
              return Promise.all(listingPromises)
                .then((data) => {
                  return {
                    ...singleNeighborhood,
                    nickname: neighborhood.area,
                    listings: data,
                  };
                })
                .then((areaInfo) => {
                  array.push(areaInfo);
                  console.log(array);
                  return array;
                })
                .then((completedData) => {
                  console.log(completedData);
                  completedData.forEach((area) => {
                    if (area.nickname === "RiNo") {
                      area.image = rino;
                    }
                    if (area.nickname === "Park Hill") {
                      area.image = parkhill;
                    }
                    if (area.nickname === "LoHi") {
                      area.image = lohi;
                    }
                    if (area.nickname === "Cap Hill") {
                      area.image = caphill;
                    }
                  });
                  return completedData;
                })
                .then((array) => this.setState({ areas: array }))
                .catch((error) => this.setState({ error }));
            });
        });
      });
  };

  //     user: '',
  //     areas: [],
  //     favorites: [],
  //     listings: []
  //   }
  // }

  // componentDidMount(){
  //   fetch("https://vrad-api.herokuapp.com/api/v1/areas")
  //   .then(response => response.json())
  //   .then(areaData => {
  //     const areaPromises = areaData.areas.map(area=>{
  //       return fetch(`https://vrad-api.herokuapp.com${area.details}`)
  //       .then(response => response.json())
  //       .then(neighborhood => {
  //         const listingInfoPromises = neighborhood.listings.map(listing=>{
  //           return fetch(`https://vrad-api.herokuapp.com${listing}`)
  //           .then(response => response.json())
  //           .then(info =>{
  //             return {id: info.listing_id,
  //                     area_id: info.area_id,
  //                     name: info.name,
  //                     address: info.address,
  //                     details: info.details,
  //                     dev_id: info.dev_id,
  //                     area: info.area,
  //                     db_connect: info.db_connect,
  //                     isFavorited: false
  //                     }
  //           })
  //         })
  //         return Promise.all(listingInfoPromises).then(listingInfo=>{
  //           return { area: area.area,
  //             // id: listingInfo[0].area_id,
  //             id: neighborhood.id,
  //             location: neighborhood.location,
  //             fullname: neighborhood.name,
  //             about: neighborhood.about,
  //             listings: listingInfo}
  //           })
  //       })
  //     })
  //     console.log('areaPromises', areaPromises)
  //     Promise.all(areaPromises).then(completedAreaData => {
  //       completedAreaData.forEach(area=>{
  //         if (area.area === "RiNo"){
  //             area.image = riNo
  //         }
  //         if (area.area === "Park Hill"){
  //           area.image = parkHill
  //         }
  //         if (area.area === "LoHi"){
  //             area.image = loHi
  //         }
  //         if (area.area === "Cap Hill"){
  //           area.image = capHill
  //         }
  //       })

  //       this.setState({areas: completedAreaData})
  //     })
  //   })
  //   .catch(err => console.error(err))
  // }

  addUser = (person) => {
    this.setState({ user: person });
  };

  removeUser = () => {
    // return  (<Route path="/" exact render={ () => <Login addUser={this.addUser}/>}/>,
    this.setState({ user: "" });
    return <Redirect to="/" exact />;
  };

  //updates state to include current user's name and purpose

  render() {
    // console.log('state', this.state.areas)
    // if (!this.state.user){
    //   return <Redirect to='/' exact />
    //   // return <Route path="/" exact render={ () => <Login addUser={this.addUser}/>}/>
    // }
    return (
      <section className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={() => <Login addUser={this.addUser} />}
          />
          {this.state.user ? (
            <Route
              path="/areas"
              render={() => (
                <>
                  {" "}
                  <Header removeUser={this.removeUser} />{" "}
                  <AreaContainer
                    user={this.state.user}
                    data={this.state.areas}
                  />{" "}
                </>
              )}
            />
          ) : (
            <Redirect to="/" exact />
          )}
        </Switch>
      </section>
    );
  }
}

export default App;

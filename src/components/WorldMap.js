import React, { useState, useEffect } from "react";
import axios from "axios";
import { Map, GeoJSON } from "react-leaflet";
import mapData from "./../data/countries.json";
import "leaflet/dist/leaflet.css";
import { click } from "@testing-library/user-event/dist/click";
import { Typography } from "@mui/material";
import {
  StyledBox,
  MainBox,
  MapDiv,
  TypographyText,
  StyleTypo,
  NameTypo,
  StyledDiv,
} from "./Styled";

const WorldMap = () => {
  const [country, setCountry] = useState("");
  console.log("country", country);
  const [couData, setCouData] = useState();
  console.log("couData", couData);

  let countryStyle = {
    fillColor: "red",
    fillOpacity: 0.1,
    color: "black",
    weight: 2,
    dashArray: 5,
  };
  const onEachCountry = (country, layer) => {
    const countryName = country.properties.ADMIN;
    layer.on("click", function (e) {
      const data = layer.bindPopup(countryName).openPopup(); // here add openPopup()
      setCountry(data._popup._content);
      e.target.setStyle({
        color: "green",
        fillColor: "green",
      });
    });
  };

  // calling the restCountry api on the basis of country
  useEffect(async () => {
    if (country) {
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${country}`
      );
      console.log("res", res);
      setCouData(res.data[0]);
    }
  }, [country]);

  return (
    <MainBox>
      <MapDiv>
        <Typography style={{ textAlign: "center" }}>My Map</Typography>
        <Map style={{ height: "100vh" }} center={[20, 40]} zoom={3}>
          <GeoJSON
            style={countryStyle}
            data={mapData.features}
            onEachFeature={onEachCountry}
          />
        </Map>
      </MapDiv>
      <StyledBox>
        {couData && (
          <>
            <TypographyText className="cndcbdc" style={{ paddingTop: "20px" }}>
              {" "}
              {couData?.name?.common}
            </TypographyText>
            <img
              style={{ height: "100px", width: "150px" }}
              src={couData?.flags?.png}
            />
            <StyledDiv>
              <StyleTypo>Capital :</StyleTypo>
              <NameTypo className="spantext">{couData.capital}</NameTypo>
            </StyledDiv>
            <StyledDiv>
              <StyleTypo>Area : </StyleTypo>
              <NameTypo>{couData.area}</NameTypo>
            </StyledDiv>
            <StyledDiv>
              <StyleTypo>Population : </StyleTypo>
              <NameTypo>{couData.population}</NameTypo>
            </StyledDiv>
            <StyledDiv>
              <StyleTypo>Continents : </StyleTypo>
              <NameTypo>{couData.continents}</NameTypo>
            </StyledDiv>
          </>
        )}
      </StyledBox>
    </MainBox>
  );
};

export default WorldMap;

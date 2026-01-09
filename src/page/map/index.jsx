import React, { useEffect, useState } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import ControlPanel from "./control-panel";
import { CustomAdvancedMarker } from "./marker/marker";
import { loadRealEstateListing } from "./lib/listing";

import "./style.css";

const API_KEY = "AIzaSyCImFnps9l5WZ-Sxm5ZZX-yowF_vWunS2c";

const Mapper = () => {
  const [realEstateListing, setRealEstateListing] = useState(null);

  useEffect(() => {
    loadRealEstateListing().then((data) => {
      setRealEstateListing(data);
    });
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <div className="advanced-marker-example" style={{ height: "100%" }}>
        <APIProvider apiKey={API_KEY} libraries={["marker"]}>
          <Map
            mapId={"bf51a910020fa25a"}
            defaultZoom={5}
            defaultCenter={{ lat: 47.53, lng: -122.34 }}
            gestureHandling={"greedy"}
            disableDefaultUI
          >
            {realEstateListing && (
              <CustomAdvancedMarker realEstateListing={realEstateListing} />
            )}
          </Map>
          <ControlPanel />
        </APIProvider>
      </div>
    </div>
  );
};

export default Mapper;

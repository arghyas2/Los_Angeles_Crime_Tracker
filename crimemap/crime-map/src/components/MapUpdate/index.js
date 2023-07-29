import React from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { Icon, divIcon, latLng, point } from "leaflet";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// create custom icon
const customIcon = new Icon({
    // iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    iconUrl: require("../../marker.png"),
    iconSize: [38, 38] // size of the icon
  });

const createClusterCustomIcon = function (cluster) {
  return new divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: point(33, 33, true)
  });
};

export const MapUpdate = (props) => {
  const navigation = useNavigate()
  const data = props.data
  const handleUpdate = async (e, data) => {
    props.setM(data);
  }
  return (
    <div>
      <MapContainer center={[34.0522, -118.2437]} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          {data.map((data) => (
            <Marker position={[data.Latitude, data.Longitude]} icon={customIcon}>
              <Popup>
                <div>
                  {data.DR_Number}
                  <br></br>
                  Crime Code: {data.Crime_Code}
                  <br></br>
                  <button onClick={(e) => handleUpdate(e, data)}>Update</button>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  )
}

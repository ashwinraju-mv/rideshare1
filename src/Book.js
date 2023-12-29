import React, { Component } from "react";

class Book extends Component {
  state = {
    latitude: null,
    longitude: null,
    error: null,
    location: "",
    destination: "",
    isInputEnabled: false
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.handleSuccess,
        this.handleError
      );
    } else {
      this.setState({ error: "Current Location Unavailable" });
    }
  }

  handleSuccess = (position) => {
    const { latitude, longitude } = position.coords;
    this.setState(
      {
        latitude,
        longitude,
        error: null
      }
    );
  };

  handleError = (error) => {
    this.setState({ error: error.message });
  };

  getLocationFromCoordinates = () => {
    const { latitude, longitude } = this.state;
    if (latitude && longitude) {
      const apiKey = "AIzaSyBcwCJooTXCte7fDDDvswC6_XYaKwLQ2_o";
      const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

      fetch(geocodingApiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "OK" && data.results.length > 0) {
            const formattedAddress = data.results[0].formatted_address;
            this.setState({ location: formattedAddress });
          }
        })
        .catch((error) => {
          console.error("Error retrieving location:", error);
        });
    }
  };

  handleGetLocation = () => {
    this.getLocationFromCoordinates();
    this.setState({ isInputEnabled: true });
  };

  handleLocationChange = (event) => {
    const { value } = event.target;
    this.setState({ location: value });
  };

  handleDestinationChange = (event) => {
    const { value } = event.target;
    this.setState({ destination: value });
  };

  render() {
    const { location, isInputEnabled } = this.state;

    return (
      <div>
        
          <label>Enter your location: </label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={this.handleLocationChange}
            disabled={!isInputEnabled}
          />
          <button onClick={this.handleGetLocation}>Get Current Location</button>
        </div>
      
    );
  }
}

export default Book;
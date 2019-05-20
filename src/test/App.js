import React, { Component } from 'react';

import './App.css';
import datafile from './data.json';


var data = datafile;
var markerLocation = []

function MarkerPosition() {
	
	for(var i = 0; i < data.length; i++){
		markerLocation[i] = [];
		for(var j = 0; j < 1; j++){
			markerLocation[i][j] = data[i].lat
			markerLocation[i][j + 1] = data[i].lng
		}
	}
	return markerLocation
}

class App extends Component {

	componentDidMount(){
		this.renderMap()
	}

	renderMap = () => {
		loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyAB_rrx4Kz3wzqlLMI0955rTPcFMW5xDa0&callback=initMap")
		window.initMap = this.initMap		
	}
	
	initMap = () => {
		// Create A Map
		var map = new window.google.maps.Map(document.getElementById("map"), {
			center: {lat: 53.3862505, lng: -6.2392135},
			zoom: 12
			})
	
		//save all the latitude and longitude in array 
		MarkerPosition();
		
		//call all position in the array to create the markers
		for(var i = 0; i < markerLocation.length; i++){
			addMarker(markerLocation[i][0], markerLocation[i][0 + 1])
		}
		
		function addMarker(x , y){
		var marker = new window.google.maps.Marker({
				position: new window.google.maps.LatLng(x, y),
				map:map,
				icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
				});
			}
	}
	
	
		
	render() {
		return (
		
			<main>
				<div id="map"></div>
			</main>
			
		);
	}
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}

//export default App;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import "bootstrap/dist/css/bootstrap.css";
import { FormControl } from "@material-ui/core";

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Polygon from 'ol/geom/Polygon';
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';



//https://taylor.callsen.me/using-reactflux-with-openlayers-3-and-other-third-party-libraries/



export default class MapContainer extends React.Component{

    componentDidMount() {
        const raster = new TileLayer({
            source: new OSM()
        });

        const source = new VectorSource({wrapX: false});

        const vector = new VectorLayer({
            source: source
        });

        const map = new Map({
            layers: [raster, vector],
            target: 'map',
            view: new View({
                center: [4961441.382031006, 5129644.04584318],
                zoom: 6
            })
        });

    }

    render(){
        return (<div id="map"></div>)
    }

}
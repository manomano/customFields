import React from "react";
import {makeStyles} from "@material-ui/core/styles";

import "bootstrap/dist/css/bootstrap.css";
import {FormControl} from "@material-ui/core";

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Polygon from 'ol/geom/Polygon';
import Draw, {createRegularPolygon, createBox} from 'ol/interaction/Draw';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';
import {OSM, Vector as VectorSource} from 'ol/source';
import {Fill, RegularShape, Stroke, Style} from 'ol/style';
import {transform} from 'ol/proj';


//https://taylor.callsen.me/using-reactflux-with-openlayers-3-and-other-third-party-libraries/


export default class MapContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            map: null,
            vectorSource: null,
            drawInteraction: null,
            coords: props.coords,
            center: props.center || [4961441.382031006, 5129644.04584318],
            zoom: props.zoom || 6
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.state.map.removeInteraction(this.state.drawInteraction);
        this.state.map.addInteraction(this.state.drawInteraction);
    }


    onchange(event){
        console.log(event)
    }

    componentDidMount() {
        const raster = new TileLayer({
            source: new OSM()
        });

        const source = new VectorSource({wrapX: false});
        if (this.state.coords) {
            //source.addFeature()
        }
        const vector = new VectorLayer({
            source: source
        });

        const map = new Map({
            layers: [raster, vector],
            target: 'map',
            view: new View({
                center: this.state.center,
                zoom: this.state.zoom,
                projection: 'EPSG:3857'
            })
        });


        const draw = new Draw({
            source: source,
            type: 'Circle',
            geometryFunction: createBox(),
            style: new Style({
                stroke: new Stroke({
                    color: 'red',
                    width: 3
                }),
                fill: new Fill({
                    color: 'rgba(0, 0, 255, 0.1)'
                })

            }),
        });


        this.setState({
            map: map,
            vectorSource: source,
            drawInteraction: draw
        });


        map.on('click', function (event) {
            if (source.getFeatures().length > 1) {
                source.removeFeature(source.getFeatures()[0]);
            }
        });

        const self = this;
        draw.on('drawend', function (evt) {


            let coordinates = evt.feature.getGeometry().getCoordinates()[0];

            console.log(transform(coordinates[0], 'EPSG:3857', 'EPSG:4326'))

            coordinates = coordinates.map(coordinate=>transform(coordinate, 'EPSG:3857', 'EPSG:4326'))

            self.setState({coords: coordinates});
        })


    }

    render() {
        return (<div className="container" style={{border: '1px solid red'}}>
            <div className="row justify-content-center">
                <input type="number" onChange={this.onchange} value={this.state.coords? this.state.coords[0][1]:''} id="topLeftY"/>
                <button className="btn btn-primary" onClick={this.handleClick}><i className="far fa-edit"></i> draw
                </button>
            </div>
            <div className="row align-middle">
                <div className="col-2 justify-content-start align-middle">
                    <input type="number" onChange={this.onchange} style={{width: '100%'}}
                           id="topLeftX"
                           value={this.state.coords? this.state.coords[0][0]:''}/>
                </div>
                <div id="map" className="col-8"></div>
                <div className="col-2 justify-content-end align-middle">
                    <input type="number" onChange={this.onchange} style={{width: '100%'}} id="rightBottomX"
                           value={this.state.coords? this.state.coords[2][0]:''}/>
                </div>
            </div>
            <div className="row justify-content-center">
                <input type="number" id="rightBottomY" onChange={this.onchange}
                       value={this.state.coords? this.state.coords[2][1]:''}/>
                </div>
        </div>)
    }

}

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
import {Fill, RegularShape, Stroke, Style} from 'ol/style';



//https://taylor.callsen.me/using-reactflux-with-openlayers-3-and-other-third-party-libraries/



export default class MapContainer extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            map: null,
            vectorSource: null,
            drawInteraction: null,
            feature: props.feature || null,
            center: props.center || [4961441.382031006, 5129644.04584318],
            zoom: props.zoom || 6
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.state.map.removeInteraction(this.state.drawInteraction);
        this.state.map.addInteraction(this.state.drawInteraction);
    }


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


        const draw = new Draw({
            source: source,
            type: 'Circle',
            geometryFunction: createBox(),
            style:  new Style({
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



        map.on('click', function(event) {
             if(source.getFeatures().length>1){
                 source.removeFeature(source.getFeatures()[0]);
             }
        });




    }

    render(){
        return (<div className="container" style={{border:'1px solid red'}}>
            <div className="row justify-content-center">
                <input type="number" id="top" />
                <button className="btn btn-primary" onClick={this.handleClick}><i className="far fa-edit"></i> draw</button>
                </div>
                <div className="row align-middle">
                    <div className="col-2 justify-content-start align-middle">
                        <input type="number" style={{width:'100%'}} id="left"/>
                    </div>
                    <div id="map" className="col-8"></div>
                    <div className="col-2 justify-content-end align-middle">
                        <input type="number" style={{width:'100%'}} id="right"/>
                    </div>
                </div>
                <div className="row justify-content-center"><input type="number" id="bottom"/></div>
            </div>)
    }

}

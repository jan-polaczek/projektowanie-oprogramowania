import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import 'leaflet-draw';
import {Forestry} from '../../_interfaces/Forestry';
import {MapData} from '../../_interfaces/forestry-map-service';
import {ForestryMapService} from '../../_services/forestry-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './forestry-map.component.html',
  styleUrls: ['./forestry-map.component.scss'],
})
export class ForestryMapComponent implements OnInit, AfterViewInit {

  @Input() height = 500;
  @Input() forestry: Forestry;

  private map;
  private forestryShape;
  private featureGroup = new L.FeatureGroup();

  constructor(private mapService: ForestryMapService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.mapService.getMapData(this.forestry).subscribe(response => {
      this.forestryShape = response.map_geojson;
      this.initShapeLayer();
      this.initDrawing();

      try {
        this.map.fitBounds(this.featureGroup.getBounds());
      } catch (error) {
      }
    }, () => {
      this.initShapeLayer();
      this.initDrawing();
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [52.25, 21.01],
      zoom: 10
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  private initShapeLayer(): void {
    const featureGroup = new L.FeatureGroup();

    function onEachGeoJsonFeature(feature, layer) {
      featureGroup.addLayer(layer);
    }

    L.geoJSON(this.forestryShape, {
      onEachFeature: onEachGeoJsonFeature,
      style: {
        weight: 4,
        opacity: 1,
        color: '#000000',
        fillOpacity: 0.5,
        fillColor: '#54c538',
      },
    });

    this.featureGroup = featureGroup;
    this.map.addLayer(this.featureGroup);
  }

  private initDrawing() {
    const options = {
      position: 'topright',
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: '#e10000',
            timeout: 2000,
            message: 'Granice leśnictwa nie mogą się przecinać.'
          },
          shapeOptions: {
            color: '#000000',
            fillColor: '#54c538'
          }
        },
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: this.featureGroup,
        remove: true,
        poly: {
          allowIntersection: false
        }
      }
    };

    const drawControl = new L.Control.Draw(options);
    this.map.addControl(drawControl);

    const featureGroup = this.featureGroup;

    this.map.on(L.Draw.Event.CREATED, function (e) {
      featureGroup.addLayer(e.layer);
    });
  }

  saveMap() {
    const mapData: MapData = {
      forestry_id: this.forestry.forestry_id,
      map_geojson: this.featureGroup.toGeoJSON()
    }

    this.mapService.editMapData(mapData).subscribe(() => {
    });
  }

  close(): void {
    this.activeModal.close();
  }
}

import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {ForestryMapService} from "../../_services/forestry-map.service";
import {Forestry} from "../../_interfaces/Forestry";

@Component({
  selector: 'app-map',
  templateUrl: './forestry-map.component.html',
  styleUrls: ['./forestry-map.component.scss']
})
export class ForestryMapComponent implements OnInit, AfterViewInit {

  @Input() height = 500;
  @Input() forestry: Forestry

  private map;
  private forestryShape;

  constructor(private mapService: ForestryMapService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.mapService.getMapData(this.forestry).subscribe(forestryShape => {
      this.forestryShape = forestryShape;
      this.initShapeLayer();
    })
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

  private initShapeLayer() {
    const shapeLayer = L.geoJSON(this.forestryShape, {
      style: (feature) => ({
        weight: 3,
        opacity: 0.5,
        color: '#008f68',
        fillOpacity: 0.5,
        fillColor: '#6DB65B'
      })
    });

    this.map.addLayer(shapeLayer);
    this.map.fitBounds(shapeLayer.getBounds());
  }
}

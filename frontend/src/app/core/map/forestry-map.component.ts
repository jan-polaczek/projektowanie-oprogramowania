import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import * as L from 'leaflet';
import {Forestry} from '../../_interfaces/Forestry';
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

  constructor(private mapService: ForestryMapService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();

    this.mapService.getMapData(this.forestry).subscribe(forestryShape => {
      this.forestryShape = forestryShape;
      this.initShapeLayer();
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
    const shapeLayer = L.geoJSON(this.forestryShape, {
      style: (feature) => ({
        weight: 4,
        opacity: 1,
        color: '#000000',
        fillOpacity: 0.5,
        fillColor: '#54c538',
      }),
    });

    this.map.addLayer(shapeLayer);
    this.map.fitBounds(shapeLayer.getBounds());
  }

  close(): void {
    this.activeModal.close();
  }
}

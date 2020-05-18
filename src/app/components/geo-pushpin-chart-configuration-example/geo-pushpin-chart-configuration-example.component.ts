import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { GeoPushpinChart, Model } from '@gooddata/react-components';
import { projectId } from '../../../utils/fixtures';
import {
  MAPBOX_TOKEN,
  cityCoordinatesUri,
  populationUri,
  densityUri,
  stateNamesUri,
  cityNamesUri } from '../../../utils/fixturesGeoChart';

interface GeoChartProps {
  projectId: any;
  location: any;
  size?: any;
  color?: any;
  segmentBy?: any;
  config?: any;
  onZoomChanged?: any;
  onCenterPositionChanged?: any;
  onLoadingChanged?: any;
  onError?: any;
}

@Component({
  selector: 'app-geo-pushpin-chart-configuration-example',
  template: '<div class="example"><div class="s-geo-pushpin-chart-configuration" style="height:500px" [id]="rootDomID"></div></div>',
})

export class GeoPushpinChartConfigurationExampleComponent implements OnInit {

  sizeMeasure = Model.measure(populationUri)
    .format("#,##0.00")
    .aggregation("sum")
    .alias("Population");
  colorMeasure = Model.measure(densityUri)
    .format("#,##0.00")
    .aggregation("sum")
    .alias("Density");
  locationAttribute = Model.attribute(cityCoordinatesUri).localIdentifier("location");
  segmentByAttribute = Model.attribute(stateNamesUri).localIdentifier("segment");
  tooltipTextAttribute = Model.attribute(cityNamesUri).localIdentifier("tooltipText");

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): GeoChartProps {
    return {      
      projectId: projectId,
      location: this.locationAttribute,
      size: this.sizeMeasure,
      color: this.colorMeasure,
      segmentBy: this.segmentByAttribute,
      config: {
        center: {
          lat: 39,
          lng: -80.5,
        },
        zoom: 6,
        tooltipText: this.tooltipTextAttribute,
        mapboxToken: MAPBOX_TOKEN,
      },
      onZoomChanged: this.onZoomChanged,
      onCenterPositionChanged: this.onCenterPositionChanged,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onError", ...params);
  }

  onZoomChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onZoomChanged", ...params);
  }

  onCenterPositionChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartClusteringExample onCenterPositionChanged", ...params);
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(GeoPushpinChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}

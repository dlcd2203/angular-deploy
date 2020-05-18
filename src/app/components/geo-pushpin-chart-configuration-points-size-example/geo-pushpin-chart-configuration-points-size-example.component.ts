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
  populationUri } from '../../../utils/fixturesGeoChart';

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
  selector: 'app-geo-pushpin-chart-configuration-points-size-example',
  templateUrl: './geo-pushpin-chart-configuration-points-size-example.component.html',
  styleUrls: ['./geo-pushpin-chart-configuration-points-size-example.component.css']
})
export class GeoPushpinChartConfigurationPointsSizeExampleComponent implements OnInit {

  state = { 
    minSize: "default",
    maxSize: "default",
  };

  sizeMeasure = Model.measure(populationUri)
    .format("#,##0.00")
    .aggregation("sum")
    .alias("Population");
  locationAttribute = Model.attribute(cityCoordinatesUri).localIdentifier("location");
  POINT_SIZE_OPTIONS = ["default", "0.5x", "0.75x", "normal", "1.25x", "1.5x"];

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationPointsSizeExample onLoadingChanged", ...params);
  }

  onError(...params) {
      // eslint-disable-next-line no-console
      return console.log("GeoPushpinChartConfigurationPointsSizeExample onError", ...params);
  }

  onZoomChanged(...params) {
      // eslint-disable-next-line no-console
      return console.log("GeoPushpinChartConfigurationPointsSizeExample onZoomChanged", ...params);
  }

  onCenterPositionChanged(...params) {
      // eslint-disable-next-line no-console
      return console.log(
          "GeoPushpinChartConfigurationPointsSizeExample onCenterPositionChanged",
          ...params,
      );
  }

  // onPointSizeChange = event => {
  //   const { id, value } = event.target;
  //   this.state({
  //       [id]: value,
  //   });
  // };

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): GeoChartProps {
    // const { groupNearbyPoints } = this.state;
    return {      
      projectId: projectId,
      location: this.locationAttribute,
      config: {
        mapboxToken: MAPBOX_TOKEN,
        // points: groupNearbyPoints,
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

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(GeoPushpinChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v1();
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


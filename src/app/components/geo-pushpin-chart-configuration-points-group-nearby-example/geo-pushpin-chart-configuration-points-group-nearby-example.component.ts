import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { GeoPushpinChart, Model } from '@gooddata/react-components';
import { projectId } from '../../../utils/fixtures';
import {
  MAPBOX_TOKEN, 
  cityCoordinatesUri } from '../../../utils/fixturesGeoChart';

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
  selector: 'app-geo-pushpin-chart-configuration-points-group-nearby-example',
  templateUrl: './geo-pushpin-chart-configuration-points-group-nearby-example.component.html'
})
export class GeoPushpinChartConfigurationPointsGroupNearbyExampleComponent implements OnInit {
  state = { 
    groupNearbyPoints: false,
    // prevState: true
  };

  locationAttribute = Model.attribute(cityCoordinatesUri).localIdentifier("location");

  toggleGroupNearbyPoints(prevState){
    this.state.groupNearbyPoints = !prevState.groupNearbyPoints;
    this.render();
  };

  // toggleGroupNearbyPoints = () => {
  //   this.setState(prevState => ({
  //       groupNearbyPoints: !prevState.groupNearbyPoints,
  //   }));
  // };

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): GeoChartProps {
    const { groupNearbyPoints } = this.state;
    return {      
      projectId: projectId,
      location: this.locationAttribute,
      config: {
        mapboxToken: MAPBOX_TOKEN,
        points: groupNearbyPoints,
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
    return console.log(
      "GeoPushpinChartConfigurationPointsGroupNearbyExample onLoadingChanged",
      ...params,
    );
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationPointsGroupNearbyExample onError", ...params);
  }

  onZoomChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationPointsGroupNearbyExample onZoomChanged", ...params);
  }

  onCenterPositionChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log(
      "GeoPushpinChartConfigurationPointsGroupNearbyExample onCenterPositionChanged",
      ...params,
    );
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

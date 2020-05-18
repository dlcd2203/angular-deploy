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
  selector: 'app-geo-pushpin-chart-configuration-viewport-example',
  template: '<div class="s-geo-pushpin-chart-configuration-viewport" style="height:500px" [id]="rootDomID"></div>',
})
export class GeoPushpinChartConfigurationViewportExampleComponent implements OnInit {

  locationAttribute = Model.attribute(cityCoordinatesUri).localIdentifier("location");

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
      config: {
        mapboxToken: MAPBOX_TOKEN,
        viewport: {
            area: "continent_sa",
        },
      },
      onError: this.onError
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationViewportExample onError", ...params);
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

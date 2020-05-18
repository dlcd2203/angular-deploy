import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';

import { GeoPushpinChart, Model } from '@gooddata/react-components';
import { projectId } from '../../../utils/fixtures';
import { CUSTOM_COLOR_PALETTE } from "../../../utils/colors";
import {
  MAPBOX_TOKEN,
  cityCoordinatesUri,
  populationUri,
  densityUri,
  stateNamesUri,
  cityNamesUri,
  predicateAttributeHeaderItemUri,
  predicateAttributeHeaderItemName } from '../../../utils/fixturesGeoChart';

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
  selector: 'app-geo-pushpin-chart-configuration-color-mapping-example',
  template: '<div class="s-geo-pushpin-chart-configuration-custom-color" style="height:500px" [id]="rootDomID"></div>',
})
export class GeoPushpinChartConfigurationColorMappingExampleComponent implements OnInit {

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
  colorMapping = [
    {
      predicate: headerItem =>
        headerItem.attributeHeaderItem &&
        headerItem.attributeHeaderItem.uri === predicateAttributeHeaderItemUri, // find attribute item by uri
      color: {
        type: "guid",
        value: "03",
      },
    },
    {
      predicate: headerItem =>
        headerItem.attributeHeaderItem &&
        headerItem.attributeHeaderItem.name === predicateAttributeHeaderItemName, // find attribute item by Name
      color: {
        type: "rgb",
        value: { r: 162, g: 37, b: 34 },
      },
    },
  ];

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
        tooltipText: this.tooltipTextAttribute,
        mapboxToken: MAPBOX_TOKEN,
        colorPalette: CUSTOM_COLOR_PALETTE,
        colorMapping: this.colorMapping,
      },
      onError: this.onError,
      onZoomChanged: this.onZoomChanged,
      onCenterPositionChanged: this.onCenterPositionChanged,
      onLoadingChanged: this.onLoadingChanged,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationColorMappingExample onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationColorMappingExample onError", ...params);
  }

  onZoomChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("GeoPushpinChartConfigurationColorMappingExample onZoomChanged", ...params);
  }

  onCenterPositionChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log(
      "GeoPushpinChartConfigurationColorMappingExample onCenterPositionChanged",
      ...params,
    );
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

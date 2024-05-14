export interface Asset {
  assetId: string;
  assetName: string;
  locationName: string;
  assetTypeName: string;
  companyName: string;
  statusName: string;
}

export interface FusionChart {
  theme: string;
  caption: string;
  subcaption: string;
  lowerLimit: string;
  upperLimit: string;
  lowerLimitDisplay: string;
  upperLimitDisplay: string;
  numberSuffix: string;
  cylFillColor: string;
  majorTMNumber?: string;
  showValue?: string;
  dataStreamUrl?: string;
  // refreshInterval?: string;
  // refreshInstantly?: string;
  // cylFillHoverColor?: string;
  // cyloriginx?: string;
  // cyloriginy?: string;
  // cylradius?: string;
  // cylheight?: string;
}

export interface FusionDataSource {
  chart: FusionChart;
  value: string;
}

export interface TankAssetResp {
  deviceId: string;
  deviceName: string;
  assetId: string;
  assetName: string;
  totalVolume: number;
  height: number;
  diameter: number;
  realTankLevel: string;
  realVolume: number;
  lat: string;
  lng: string;
  manufDeviceId: string;
  shape: string;
  color: string;
}

export interface Tank {
  max: number;
  title: string;
  level: number;
  color: string;
  shape: string;
  tankId: string;
}

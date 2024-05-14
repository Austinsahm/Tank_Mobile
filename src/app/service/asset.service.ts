import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { HttpResp } from '../model/http';
import { Asset } from '../model/asset';
// import { User} from '../model/user'

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  getAssetList(subdomain: string){
    return this.http
    .get<HttpResp<Asset[]>>(
      `${environment.apiServerEndpoint}/asset/asset-list/companyId/${subdomain}`)
      .pipe(
        map((_asset) => {
         return _asset
        })
      );
  }

  getAssetDevices(subdomain:string, assetId:string){
    return this.http
    .get<HttpResp<Asset[]>>(
      `${environment.apiServerEndpoint}/device/smart-home-dashboard/companyid/${subdomain}/assetid/${assetId}`)
      .pipe(
        map((_assetDevice)=>{
          return  _assetDevice
        })
      )
  }

  smartHomeDevice(
    companyId:string,
    assetId:string,
  ): Observable<any>{
   return(
    this.http.get<HttpResp<Asset[]>>(
      `${environment.apiServerEndpoint}/device/smart-home-dashboard/companyid/${companyId}/assetid/${assetId}`)
   )
  }

}

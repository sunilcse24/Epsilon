import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { ApiURL } from '../config/api-url';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private _http: HttpClient
  ) { }


  public getProductData():Observable<any> {
    return this._http.get(ApiURL.productApiURL);
  }

}

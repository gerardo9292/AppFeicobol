import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  baseUrl: string = "http://almacen.local:8000/api";
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  public getCategorias(){
    return this.http.get(this.baseUrl+'/categorias');
  }
}

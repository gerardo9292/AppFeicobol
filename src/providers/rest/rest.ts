import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class RestProvider {
  baseUrl: string = "http://almacen.local:8000/api";
  data;
  key = "mi_aplicacion_gerardo123";

  constructor(public http: Http) {
  }

  public getAlmacenes(key){
    //return this.http.get(this.baseUrl+'/almacenes');
    var url = this.baseUrl + "/almacenes";
    var headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    var ops = new RequestOptions({ headers: headers });
    var formdata = "'&token=" + key + "";
    return new Promise((resolve, reject) => {
      this.http.post(encodeURI(url),formdata, ops).map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err => reject(err));
    });
  }

  public getCategorias(key) {
    //return this.http.get(this.baseUrl + '/categorias');
    var url = this.baseUrl + "/categorias";
    var headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    var ops = new RequestOptions({ headers: headers });
    var formdata = "'&token=" + key + "";
    return new Promise((resolve, reject) => {
      //this.http.get(encodeURI(url)).map((res: Response) => res.json())
      this.http.post(encodeURI(url), formdata, ops).map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err => reject(err));
    });
  }
  
  public login(email, password) {
    //return this.http.get(this.baseUrl + '/categorias');
    var url = this.baseUrl + "/login";
    var headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    var ops = new RequestOptions({ headers: headers });
    var formdata = "'&email=" + email + '&password=' + password + "";
    return new Promise((resolve, reject) => {
      //this.http.get(encodeURI(url)).map((res: Response) => res.json())
      this.http.post(encodeURI(url), formdata, ops).map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err => reject(err));
    });
  }
  public pedidosUser(userId, key) {
    var url = this.baseUrl + '/pedido-operativo/' + userId;

    var headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    var ops = new RequestOptions({ headers: headers });
    var formdata = "'&token=" + key + "";
    return new Promise((resolve, reject) => {
      //this.http.get(encodeURI(url)).map((res: Response) => res.json())
      this.http.post(encodeURI(url), formdata, ops).map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err => reject(err));
    });
  }

  public getProductos(categoria_producto_id, almacen_id, key) {
    //return this.http.get(this.baseUrl + '/producto');
    
    var url = this.baseUrl + '/productos/' + categoria_producto_id + '/' + almacen_id;
    var headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    var ops = new RequestOptions({ headers: headers });
    var formdata = "'&token=" + key + "";
    //var formdata = "'&categoria_producto_id=" + categoria_producto_id + "&almacen_id=" + almacen_id + "";
      return new Promise((resolve, reject) => {
        this.http.post(encodeURI(url), formdata, ops).map((res: Response) => res.json())
          .subscribe(data => {
            this.data = data;
            resolve(this.data);
          }, err => reject(err));
      })
    }
  public sendParamsB(token, cantidad, tipo_empaque, descripcion, estado, fecha, hora, usuario_id, producto_id) {
    var url = this.baseUrl + "/pedido";
    var headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    })
    var ops = new RequestOptions({ headers: headers });
    var formdata = "'&token=" + token + '&cantidad=' + cantidad + '&tipo_empaque=' + tipo_empaque + '&descripcion=' + descripcion + '&estado=' + estado +'&fecha='+ fecha + '&hora='+ hora + '&usuario_id=' + usuario_id + '&producto_id=' + producto_id +  "";
    return new Promise((resolve, reject) => {
      //this.http.get(encodeURI(url)).map((res: Response) => res.json())
      this.http.post(encodeURI(url), formdata, ops).map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        }, err => reject(err));
    });
  }

  public getTipoEmpaques() {
    return this.http.get(this.baseUrl + '/pedido-operativo');
  }


}

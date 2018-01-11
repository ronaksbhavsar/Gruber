import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
 
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
    url: string = 'https://gruberapidev.azurewebsites.net';
    //url: string = 'http://192.168.4.142:8089';    
    token: any;
    
    constructor(public http: HttpClient) {
        this.token = "";
    }
    // Custom method to add standard headers.
    public _addStandardHeaders(header: HttpHeaders) {
        header = header.append('Content-Type', 'application/json');
        header = header.append('Accept', 'application/json');
        header = header.append('Access-Control-Allow-Orgin', '*');  
        //header = header.append('ZUMO-API-VERSION', '2.0.0');  
                 
        return header;
    }

    // custom method to initialize reqOpts
    public _initializeReqOpts(reqOpts) {
        if (!reqOpts) {
            reqOpts = {
                headers: new HttpHeaders(),
                params: new HttpParams()
            };
        }
        return reqOpts;
    }
    get(endpoint: string, params?: any, reqOpts?: any) {
        if (!reqOpts) {
            reqOpts = {
                params: new HttpParams()
            };
        }

        // Support easy query params for GET requests
        if (params) {
            reqOpts.params = new HttpParams();
            for (let k in params) {
                reqOpts.params.set(k, params[k]);
            }
        }

        return this.http.get(this.url + '/' + endpoint, reqOpts);
    }

    post(endpoint: string, body: any, reqOpts?: any) {   
        return this.http.post(this.url + '/' + endpoint, body, reqOpts);
    }

    put(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }

    delete(endpoint: string, reqOpts?: any) {
        return this.http.delete(this.url + '/' + endpoint, reqOpts);
    }

    patch(endpoint: string, body: any, reqOpts?: any) {
        return this.http.put(this.url + '/' + endpoint, body, reqOpts);
    }
}

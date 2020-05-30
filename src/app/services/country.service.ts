import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

    constructor(private http : HttpClient ,private router : Router) { }

    private countrySub = new Subject<any>();

    country :any;

    getCountryService(){
        this.http.post('http://localhost:1025/demo/getCountry',null).subscribe((responseData)=>{
            if(responseData["status"]=="success"){
                console.log("Successfully got the result..");
                console.log(responseData["data"]);
                this.countrySub.next(responseData["data"]);
                //return responseData["data"];
            }
        });
    }

    getCountryUpdateListener(){
        console.log(this.countrySub.asObservable());
        return this.countrySub.asObservable();
    }

}
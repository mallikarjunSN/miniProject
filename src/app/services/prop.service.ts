import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Property } from '../models/property.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class PropService {

  constructor(private http:HttpClient,private router:Router) { }

  private searchInfo = new Subject<any>();

  private allInfo = new Subject<any>();

  private propInfo = new Subject<Property>();
  private notif_info = new Subject<any>();
  private history_info = new Subject<any>();

  notifications:any[]=[];
  properties:Property[]=[];
  history:any[]=[];

  addProp(property:any){
    console.log(property);

    this.http.post('http://localhost:1025/prop/addprop',property).subscribe((responseData)=>{
      console.log(responseData["status"]);
    });
  }


  editProp(property:any){
    this.http.post('http://localhost:1025/prop/editProp',property).subscribe((responseData)=>{
      console.log(responseData["status"]);
      if(responseData["status"]=="success"){
        window.alert("success");
        this.router.navigate(["/ownerac"]);
      }
    });
  }

  deleteProp(props:any){
    this.http.post('http://localhost:1025/prop/deleteProp',props).subscribe((responseData)=>{
      if((responseData["status"])=="success"){
        window.alert("deleted successfully..!!");
      }
    });
  }
  
  keyword:any;

  searchProp(str:string){
    console.log(str);

    this.keyword={keyword:str};
    this.http.post('http://localhost:1025/prop/searchProp',this.keyword).subscribe((responseData)=>{
      console.log(responseData["status"]);
      if(responseData["status"]=="success"){
        this.searchInfo.next(responseData["data"]);
        // this.router.navigate(["/search"]);
      }else
        console.log("failed");
    });
  }

  phone:any;

  allProp(str:string){
    this.phone={phone:str};
    this.http.post('http://localhost:1025/prop/allProp',this.phone).subscribe((responseData)=>{
      console.log(responseData["status"]);
      if(responseData["status"]=="success"){
        this.searchInfo.next(responseData["data"]);
        this.properties=responseData["data"];
        this.allInfo.next(this.properties);
        console.log(this.properties);
      }else
        console.log("failed");
    });
  }

  getsearchUpdateListener(){
    return this.searchInfo.asObservable();
  }

  prop:Property;
  getProp(str:any){
    this.phone={phone:str.ownerid,houseno:str.houseno};
    this.http.post('http://localhost:1025/prop/getProp',this.phone).subscribe((responseData)=>{
      console.log(responseData["status"]);
      if(responseData["status"]=="success"){
        this.prop=responseData["data"]
        this.propInfo.next(this.prop);
        //console.log(this.properties);
      }else
        console.log("failed");
    });
  }

  propFn(){
    return this.prop;
  }


  getPropUpdateListener(){
    return this.propInfo.asObservable();
  }


  getNotifications(user:User){
    this.phone={phone:user.phone};
    if(user.usertype=='owner'){
      this.http.post('http://localhost:1025/demo/getOwnerNotifications',this.phone).subscribe((responseData)=>{
      console.log(responseData["status"]);
      if(responseData["status"]=="success"){
        this.notifications=responseData["data"]
        this.notif_info.next(this.notifications);
        console.log(this.notifications);
      }else
        console.log("failed");
      });
    }else if(user.usertype=='renter'){
      this.http.post('http://localhost:1025/demo/getRenterNotifications',this.phone).subscribe((responseData)=>{
        console.log(responseData["status"]);
        if(responseData["status"]=="success"){
          this.notifications=responseData["data"]
          this.notif_info.next(this.notifications);
          console.log(this.notifications);
        }else
          console.log("failed");
        });
    }
  }
  
  notif_fn(){
    return this.notifications;
  }
  getNotifUpdateListener(){
    return this.notif_info.asObservable();
  }
}

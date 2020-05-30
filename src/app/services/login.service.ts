import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';
import { PropService } from './prop.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient,private router:Router,private propService:PropService) { }

  private userSub = new Subject<any>(); 
  private ownerSub = new Subject<any>();
  private wishlistSub = new Subject<any>();
  private requestSub = new Subject<any>();
  private currentSub = new Subject<any>();
  private rentHistorySub = new Subject<any>();

  sentRequests:any[]=[];
  wishlist:any[]=[];
  current_rent:any;
  renting_history:any[]=[];

  loggedIn:boolean=false;
  private login_info = new Subject<Boolean>();
  private msg_info = new Subject<string>();


  msg:string;
  user: any;
  flag:boolean;
  owner:any;

  login(user : any){
    this.user={phone:user.phone,password:user.password};
    console.log(this.user);
    console.log("inside loginservice : "+this.user.password);
    this.http.post('http://localhost:1025/demo/login',this.user).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log("success :"+responseData["data"][0]);
        this.user=responseData["data"][0];
        console.log(this.user);
        this.userSub.next(responseData["data"][0]);
        this.loggedIn=true;
        this.login_info.next(true);
        this.msg="";
        this.msg_info.next(this.msg);



        this.router.navigate(["/home"]);
        // if(this.user.usertype=="owner"){
        //   this.router.navigate(["/ownerac"]);
        // }else if(this.user.usertype=="user"){
        //   this.router.navigate(["/renterac"]);
        // }
      }else if(responseData["status"]=="failure"){
        this.msg="invalid credentials";
        this.msg_info.next(this.msg);
      }  
      // console.log("response got : "+responseData["data"][0].password);


    });
  }

  addtoWishlist(data:any){
    this.http.post('http://localhost:1025/prop/addtoWishlist',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        window.alert("added to wishlist successfully..!!!");
        // this.wishlistSub.next(responseData["data"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }
  removeFromWishlist(data:any){
    // let d={}
    this.http.post('http://localhost:1025/prop/removeFromWishlist',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        window.alert("removed from wishlist successfully..!!!");
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

  sendRequest(data:any){
    this.http.post('http://localhost:1025/prop/sendRequest',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        window.alert("request sent successfully");
        // this.wishlistSub.next(responseData["data"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
        window.alert("unable to send request");

      }
    });
  }

  acceptRequest(data:any){
    this.http.post('http://localhost:1025/prop/acceptRequest',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        window.alert("request Accepted successfully");

        // this.wishlistSub.next(responseData["data"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

  rejectRequest(data:any){
    this.http.post('http://localhost:1025/prop/rejectRequest',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        window.alert("request Rejected successfully");
        // this.wishlistSub.next(responseData["data"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

  confirmRequest(data:any){
    this.http.post('http://localhost:1025/prop/confirmRequest',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        window.alert("Payment successful..!!")
        this.router.navigate(["/renterac"]);
      }else if(responseData["status"]=="failure"){
        window.alert("Unable to confirm");
        console.log(responseData["status"]);
      }
    });
  }

  endCurrentRent(data:any){
    this.http.post('http://localhost:1025/prop/endCurrentRent',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        window.alert("Successfully Ended current Rent..!!!");
        console.log(responseData["status"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
        window.alert("Unable to End current Rent please try later");
      }
    });
  }

  declineRequest(data:any){
    this.http.post('http://localhost:1025/prop/declineRequest',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

  clearRequest(data:any){
    this.http.post('http://localhost:1025/prop/clearRequest',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

  getOwner(phone : string){
    let data={phone:phone};
    this.http.post('http://localhost:1025/prop/getOwner',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        // console.log("success :"+responseData["data"][0]);
        this.owner=responseData["data"][0];
        // console.log(this.owner);
        this.ownerSub.next(responseData["data"][0]);
      }else if(responseData["status"]=="failure"){
        this.msg="invalid credentials";
        this.msg_info.next(this.msg);
      }
    });
  }

  getOwnerUpdateListener(){
    return this.ownerSub.asObservable();
  }

  getMsgUpdateListener(){
    return this.msg_info.asObservable();
  }

  messages : any[];

  getUserUpdateListener(){
    return this.userSub.asObservable();
  }

  getLoginUpdateListener(){
    return this.login_info.asObservable();
  }

  signup(user:any){
    console.log(user);
    this.http.post("http://localhost:1025/demo/signup",user).subscribe((responseData)=>{
      console.log("signup Response"+responseData["status"]);
      if(responseData["status"]=="success"){
        window.alert("account created successfully");
        this.router.navigate(["/home"]);
        
      }else{
        window.alert("Phone number already registered..!!");
      }
    });
  }

  getOwnerAccount(user:User){
    this.propService.allProp(user.phone);
    this.propService.getNotifications(user);
    this.getRentingHistory(user);
  }
  getRenterAccount(user:User){
    console.log(user);
    this.getSentRequests(user);
    this.getCurrentRent(user);
    this.propService.getNotifications(user);
    this.getRentingHistory(user);
    this.getWishlist(user);
  }

  getRentingHistory(user:User){
    let data={user:user};
    this.http.post('http://localhost:1025/prop/getRentingHistory',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        this.renting_history=responseData["data"];
        this.rentHistorySub.next(this.renting_history);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

  getHistoryUpdateListener(){
    return this.rentHistorySub.asObservable();
  }

  getCurrentRent(user:User){
    let d={user:user};
    this.http.post('http://localhost:1025/prop/getCurrentRent',d).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        this.current_rent=responseData["data"][0];
        this.currentSub.next(this.current_rent);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }
  getCurrentRentUpdateListener(){
    return this.currentSub.asObservable();
  }

  getSentRequests(user:User){
    this.http.post('http://localhost:1025/prop/getSentRequests',user).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        this.sentRequests=responseData["data"]
        this.requestSub.next(this.sentRequests);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }
  getSentRequestsUpdateListener(){
    return this.requestSub.asObservable();
  }

  getWishlist(user:User){
    let data={user:user}
    console.log(user);
    this.http.post('http://localhost:1025/prop/getWishlist',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        // console.log(responseData["status"]);
        this.wishlist=responseData["data"];
        this.wishlistSub.next(this.wishlist);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }
  getWishlistUpdateListener(){
    return this.wishlistSub.asObservable();
  }

  complete(user:any){
    this.http.post('http://localhost:1025/demo/completeProfile',user).subscribe((responseData)=>{
      console.log(responseData["status"]);
      if(responseData["status"]=="success"){
        window.alert("Your account has been verified and completed successfully..!!");
      }else{
        window.alert("please enter proper credentials..!!");
      }
    })

  }

  editProfile(data:any){
    this.http.post('http://localhost:1025/demo/editProfile',data).subscribe((responseData)=>{
      if(responseData["status"]=="success"){
        console.log(responseData["status"]);
        // this.rentHistorySub.next(responseData["data"]);
      }else if(responseData["status"]=="failure"){
        console.log(responseData["status"]);
      }
    });
  }

}

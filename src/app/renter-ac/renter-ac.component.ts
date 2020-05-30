import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { NgForm } from '@angular/forms';
import { PropService } from '../services/prop.service';
import { Property } from '../models/property.model';

@Component({
  selector: 'app-renter-ac',
  templateUrl: './renter-ac.component.html',
  styleUrls: ['./renter-ac.component.css']
})
export class RenterAcComponent implements OnInit {

  constructor(private loginService:LoginService,private propService:PropService) { }

  private user_updated=new Subscription;
  private notif_updated=new Subscription;
  private sent_request_updated=new Subscription;
  private current_rent_updated=new Subscription;
  private history_updated=new Subscription;
  private wishlist_updated=new Subscription;
  user:User;

  requestFlag:boolean=false;
  currentFlag:boolean=false;
  HisrotyFlag:boolean=false;
  wishlistFlag:boolean=false;
  profileFlag:boolean=false;


  // properties:Property[]=[];
  notifications:any[]=[];
  sent_requests:any[]=[];
  current_rent:any;
  history:any[]=[];
  wishlist:any[]=[];

  ngOnInit(){
    this.user=this.loginService.user;
    this.user_updated=this.loginService.getLoginUpdateListener()
    .subscribe((user:any)=>{
      this.user=user;
    });

    this.loginService.getRenterAccount(this.user);

    this.propService.getNotifications(this.user);
    this.notifications=this.propService.notifications;
    this.notif_updated=this.propService.getNotifUpdateListener()
    .subscribe((notifications:any[])=>{
      this.notifications=notifications;
    });

    // this.loginService.getSentRequests(this.user);
    this.sent_requests=this.loginService.sentRequests;
    this.sent_request_updated=this.loginService.getSentRequestsUpdateListener()
    .subscribe((sr:any[])=>{
      this.sent_requests=sr;
    });

    this.wishlist=this.loginService.wishlist;
    this.wishlist_updated=this.loginService.getWishlistUpdateListener()
    .subscribe((w)=>{
      this.wishlist=w;
    });

    // this.loginService.getCurrentRent(this.user)
    this.current_rent=this.loginService.current_rent;
    this.current_rent_updated=this.loginService.getCurrentRentUpdateListener()
    .subscribe((c)=>{
      this.current_rent=c;
    });

    this.history=this.propService.history;
    this.history_updated=this.loginService.getHistoryUpdateListener()
    .subscribe((h:any[])=>{
      this.history=h;
      // console.log(this.history);
    });

  }


  endCurrentRent(){
    if(window.confirm("Are you sure to end renting this house??")){
      let date=new Date();
      let d = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
      let data={current_rent:this.current_rent,date:d};
      this.loginService.endCurrentRent(data);
      this.loginService.getCurrentRent(this.user);
    }
  }

  removeFromWishlist(i:any){
    this.loginService.removeFromWishlist(i);
    this.loginService.getWishlist(this.user);
  }



  complete_profile(proform:NgForm){
    let profile={user:this.user,email:proform.value.email,address:proform.value.address,phone2:proform.value.phone2,aadhar:proform.value.aadhar};
    console.log(profile);
    this.loginService.complete(profile);
    // window.alert("Profile updated successfully..!!");
    this.profileFlag=false;
  } 

}

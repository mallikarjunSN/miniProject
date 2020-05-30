import { Component, OnInit } from '@angular/core';
import { PropService } from '../services/prop.service';
import { Subscription, Timestamp } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../models/property.model';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-prop',
  templateUrl: './prop.component.html',
  styleUrls: ['./prop.component.css']
})
export class PropComponent implements OnInit {

  ownerid:string;
  houseno:string;
  constructor(private propService:PropService,private activatedRoute:ActivatedRoute,private loginservice:LoginService,private router:Router) {
    this.ownerid=this.activatedRoute.snapshot.paramMap.get('id1');
    this.houseno=this.activatedRoute.snapshot.paramMap.get('id2');
  }


  private prop_updated = new Subscription;
  private user_updated = new Subscription;
  private login_updated= new Subscription;
  private owner_updated= new Subscription;
  private wishlist_updated= new Subscription;

  wishlist_flag:boolean=false;


  prop:Property;
  user:User;
  login_info:boolean;
  ownerFlag:boolean=false;
  owner:any;
  wishlist:any[]=[];


  current:number=0;
  poster:string;

  ngOnInit() {
    this.propService.getProp({ownerid:this.ownerid,houseno:this.houseno});
    this.prop_updated = this.propService.getPropUpdateListener()
    .subscribe((prop:any)=>{
      this.prop=prop[0];
      // console.log(this.prop);
    });

    this.user=this.loginservice.user;
    this.user_updated=this.loginservice.getUserUpdateListener()
    .subscribe((user:User)=>{
      this.user=user;
    });

    this.login_info=this.loginservice.loggedIn;
    this.login_updated=this.loginservice.getLoginUpdateListener()
    .subscribe((logInfo:boolean)=>{
      this.login_info=logInfo;
    });

    this.loginservice.getOwner(this.ownerid);
    
    this.owner=this.loginservice.owner;
    this.owner_updated=this.loginservice.getOwnerUpdateListener()
    .subscribe((owner)=>{
      this.owner=owner;
    });


    this.wishlist=this.loginservice.wishlist;
    // this.loginservice.getWishlist(this.user);
    this.wishlist_updated=this.loginservice.getWishlistUpdateListener()
    .subscribe((w)=>{
      this.wishlist=w;
      for(let i of w){
        if(i.houseno==this.prop.houseno){this.wishlist_flag=true;break;}
      }
    });

    

    this.poster="../../assets/house/"+this.ownerid+"/"+this.houseno+"/"+"pic0"+".jpg";
    console.log(this.poster);
  }

  message:string;
  addtoWishlist(){
    if(this.login_info){
      let data={user:this.user,prop:this.prop};
      console.log(data);
      this.loginservice.addtoWishlist(data);
    }else{
      this.message="Please Login to continue";
    }
  }

  gotoAccount(){
    if(this.user.usertype=="renter")
      this.router.navigate(["/renterac"]);
    else if(this.user.usertype=="owner")
      this.router.navigate(["/ownerac"]);
  }


  sendRequest(){
    let date=new Date();
    if(this.login_info){
      let d = date.toISOString();
      console.log(d);
      let data={user:this.user,prop:this.prop,owner:this.owner,date:d};
      console.log(data);
      this.loginservice.sendRequest(data);
    }else{
      this.message="Please Login to continue";
    }
  }

  getOwner(){
    if(this.login_info){
      this.ownerFlag=true;
    }else{
      this.message="Please Login to continue";
    }
  }


  fullscreen:boolean=false;

  change(code:any){
    // console.log(this.prop);
    if(code==1){
      if(this.current==0)this.current=4;
      this.current=Math.abs((this.current-1)%4);
      this.poster="../../assets/house/"+this.prop.ownerid+"/"+this.prop.houseno+"/pic"+this.current+".jpg";
      // window.alert("pressed previous button "+this.current);
    }else{
      this.current=(this.current+1)%4;
      this.poster="../../assets/house/"+this.prop.ownerid+"/"+this.prop.houseno+"/pic"+this.current+".jpg";
      // window.alert("pressed next button "+this.current);
    }

    console.log(this.poster);
    
    

  }

}

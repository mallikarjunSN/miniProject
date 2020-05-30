import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropService } from '../services/prop.service';
import { LoginService } from '../services/login.service';
import { Property } from '../models/property.model';
import { User } from '../models/user.model';
import { NgModel, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export interface Address{
  street:string,
  city:string,
  landmark:string,
  state:string
}

@Component({
  selector: 'app-owner-ac',
  templateUrl: './owner-ac.component.html',
  styleUrls: ['./owner-ac.component.css']
})

export class OwnerAcComponent implements OnInit {

  constructor(private propService:PropService,private loginService:LoginService,private router:Router) { }

  prop_updated = new Subscription;
  user_updated = new Subscription;
  notifications_updated = new Subscription;
  history_updated = new Subscription;

  
  public notifications:any[]=[];

  properties:Property[]=[];
  history:any[]=[];

  user:User; 

  addPropflag:boolean=false;
  deleteFlag:boolean=false;
  editFlag:boolean=false;
  profileFlag:boolean=false;
  historyFlag:boolean=false;
  flagStack:any[]=[];


  ngOnInit() {
    this.user=this.loginService.user;
    this.user_updated=this.loginService.getLoginUpdateListener()
    .subscribe((user:any)=>{
      this.user=user;
    });

    this.loginService.getOwnerAccount(this.user);

    this.propService.allProp(this.user.phone);
    this.properties=this.propService.properties;
    this.prop_updated=this.propService.getsearchUpdateListener()
    .subscribe((houses:any[])=>{
      this.properties=houses;
    });

    this.propService.getNotifications(this.user);
    this.notifications=this.propService.notifications;
    this.prop_updated=this.propService.getNotifUpdateListener()
    .subscribe((notifications:any[])=>{
      this.notifications=notifications;
    });

    this.history=this.propService.history;
    this.history_updated=this.loginService.getHistoryUpdateListener()
    .subscribe((h)=>{
      this.history=h;
    })
  }

  sortData:any[]=[];
  sort(str:string){

    console.log("sort "+str);
    this.sortData=this.properties;
    console.log(this.properties);
    this.properties= this.sortData.sort((a, b) => {
      const isAsc = true;
      switch (str) {
        case 'houseno': return compare(a.houseno, b.houseno, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'bhk': return compare(a.bhk, b.bhk, isAsc);
        default:return 0;
      }
    });
  }
  reverse(){
    this.properties.reverse();
  }
  prop:Property;
  editProp(edits:NgModel){
    console.log(edits.viewModel);
    this.prop=edits.viewModel;
    this.router.navigate(["/editProp",this.prop.ownerid,this.prop.houseno]);
  }

  selected:string[]=[];
  str:string;
  data:any;
  deleteSelected(demo:NgModel){
    if(window.confirm("Do you want to delete? this cannot be undone..!!!")){
      this.str=demo.value;
      this.str=this.str.toString();
      this.selected=this.str.split(',');
      for(let i of this.selected)
        console.log("i "+i);

      this.data={ownerid:this.user.phone,selected:this.selected};
      this.propService.deleteProp(this.data);
      this.deleteFlag=false;
      window.alert("deleted successfully..!!!");
    }
    
  }

  acceptRequest(notif:any){
    this.loginService.acceptRequest({renterid:notif.renterid,ownerid:this.user.phone,houseno:notif.houseno});
    this.propService.getNotifications(this.user);
  }

  clearRequest(i:any){
    let data={ownerid:i.ownerid,renterid:i.renterid,houseno:i.houseno};
    this.loginService.clearRequest(data);
    this.propService.getNotifications(this.user);
  }

  rejectRequest(notif:any){
    this.loginService.rejectRequest({renterid:notif.renterid,ownerid:this.user.phone,houseno:notif.houseno});
    this.propService.getNotifications(this.user)
  }

  i:number;
  last:number=0;
  display(choice:any){
    this.i=1;
    // while(this.i<=2){
    //   switch(this.last){
    //     case 0:break;
    //     case 1:this.profileFlag=!this.profileFlag;break;
    //     case 2:this.addPropflag=!this.addPropflag;break;
    //     case 3:this.deleteFlag=!this.deleteFlag;break;
    //     case 4:this.editFlag=!this.editFlag;break;
    //   }
    //   this.i++;
    //   this.last=choice;
    // }
    this.addPropflag=!this.addPropflag;
    let doc=document.getElementById(choice);
    console.log(doc);
    doc.scrollIntoView();
  }

  profile:any;
  complete_profile(proform:NgForm){
    this.profile={user:this.user,email:proform.value.email,address:proform.value.address,phone2:proform.value.phone2,aadhar:proform.value.aadhar};
    console.log(this.profile);
    this.loginService.complete(this.profile);
    // window.alert("Profile updated successfully..!!");
    this.profileFlag=false;
  } 

  usertype:string="both"  ;
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
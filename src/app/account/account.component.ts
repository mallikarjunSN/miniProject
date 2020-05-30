import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { Messages } from '../models/test.model';
import { NgForm, NgModel } from '@angular/forms';
import { PropService } from '../services/prop.service';
import { Property } from '../models/property.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  private userUpdated = new Subscription;
  private notif_updated = new Subscription;
  private prop_updated = new Subscription;
  constructor(private loginservice:LoginService,private propService:PropService,private router:Router) { }

  emptyInbox : boolean=false;
  respond : boolean=false;

  firstName:string;

  notifications:any[]=[];
  property:Property;

  user : any;
  ngOnInit() {
    this.user=this.loginservice.user;
    this.userUpdated = this.loginservice.getUserUpdateListener()
    .subscribe((user:any)=>{
      this.user=user;
    });
    
    this.firstName=this.loginservice.user.firstName;

    this.notifications=this.propService.notif_fn();
    this.notif_updated=this.propService.getNotifUpdateListener()
    .subscribe((not)=>{
      this.notifications=not;
    });

    this.property=this.propService.propFn();
    this.prop_updated=this.propService.getPropUpdateListener()
    .subscribe((p)=>{
      this.property=p;
    });
    
  }

  confirmRequest(request:any){
    this.loginservice.getOwner(request.ownerid);
    this.propService.getProp({ownerid:request.ownerid,houseno:request.houseno});
    this.router.navigate(["/payment",request.ownerid,request.houseno,request.renterid]);
  }

  clearRequest(request:any){
    let data={renterid:request.renterid,ownerid:request.ownerid,houseno:request.houseno};
    this.loginservice.clearRequest(data);
    this.propService.getNotifications(this.user);
  }

  declineRequest(request:any,reason:NgModel){
    let data={renterid:request.renterid,ownerid:request.ownerid,houseno:request.houseno,reason:reason.value};
    this.loginservice.declineRequest(data);
    this.propService.getNotifications(this.user);
  }

}
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Property } from '../models/property.model';
import { PropService } from '../services/prop.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-new-component',
  templateUrl: './new-component.component.html',
  styleUrls: ['./new-component.component.css']
})
export class NewComponentComponent implements OnInit {

  ownerid:string;
  houseno:string;
  renterid:string;


  constructor(private propService:PropService,private activatedRoute:ActivatedRoute,private loginService:LoginService){
    this.ownerid=activatedRoute.snapshot.paramMap.get('id1');
    this.houseno=activatedRoute.snapshot.paramMap.get('id2');
    this.renterid=activatedRoute.snapshot.paramMap.get('id3');
  }

  private prop_updated=new Subscription;
  private renter_updated=new Subscription;
  private owner_updated=new Subscription;

  prop:Property;

  renter:User;
  owner:User;
  
  ngOnInit() {
    let d={ownerid:this.ownerid,houseno:this.houseno};
    this.propService.getProp(d);
    this.prop=this.propService.prop;
    this.prop_updated=this.propService.getPropUpdateListener()
    .subscribe((p)=>{
      this.prop=p[0];
    });

    this.renter=this.loginService.user;
    this.renter_updated=this.loginService.getUserUpdateListener()
    .subscribe((r)=>{
      this.renter=r;
    });

    this.loginService.getOwner(this.ownerid);
    this.owner=this.loginService.owner;
    this.owner_updated=this.loginService.getOwnerUpdateListener()
    .subscribe((owner)=>{
      this.owner=owner;
    });
  }

  confirmRent(payForm:NgForm){
    let date=new Date();
    let d = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    let data={renter:this.renter,owner:this.owner,prop:this.prop,date:d}
    console.log(data);
    this.loginService.confirmRequest(data);
  }

}

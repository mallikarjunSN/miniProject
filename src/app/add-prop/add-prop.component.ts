import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PropService } from '../services/prop.service';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-prop',
  templateUrl: './add-prop.component.html',
  styleUrls: ['./add-prop.component.css']
})
export class AddPropComponent implements OnInit {

  prop_info:any;

  constructor(private propService:PropService,private loginService:LoginService) { }
  
  private user_update = new Subscription;

  address : string;

  userInfo : User;


  ngOnInit(){
    this.userInfo=this.loginService.user;
    this.user_update = this.loginService.getUserUpdateListener()
    .subscribe((user:User)=>{
      this.userInfo=user;
    });

  }

  submit(loginForm : NgForm){
    console.log("login page ");
    
    this.prop_info={
      houseno:loginForm.value.houseno,
      ownerid:this.userInfo.phone,
      name:loginForm.value.housename,
      bhk:loginForm.value.housetype,
      street:loginForm.value.street,
      city:loginForm.value.city,
      landmark:loginForm.value.landmark,
      state:loginForm.value.state,
      pin:loginForm.value.pincode,
      suitable:loginForm.value.suitable,
      more:loginForm.value.more,
      rent_amt:loginForm.value.rent_amt,
    };

    console.log(this.prop_info);


    this.propService.addProp(this.prop_info);
    //this.message=this.loginservice.login(this.user);

  }

  ngOnDestroy(){
    this.user_update.unsubscribe();
  }

}

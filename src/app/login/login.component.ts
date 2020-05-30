import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LoginComponent>,private loginservice : LoginService) { }


  msg_subs = new Subscription;

  ngOnInit() {
    this.loggedIn=this.loginservice.loggedIn;
    this.msg_subs=this.loginservice.getMsgUpdateListener()
    .subscribe((message:string)=>{
      this.message=message;
      if(message=='')
        this.onNoClick();
    })
  }


  loggedIn:boolean;

  onNoClick(): void {
    this.dialogRef.close();
  }
  message : string;
  
  user : any;

  submit(loginForm : NgForm){
    this.message="";

    this.user={phone:loginForm.value.phone,password:loginForm.value.password};
    this.loginservice.login(this.user);

    console.log(this.message);
  }

}

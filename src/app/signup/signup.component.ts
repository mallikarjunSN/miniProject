import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private loginservice:LoginService) { }

  ngOnInit() {

    
  }

  firstname : String;
  lastname: String;
  phnumb: String;
  passwrd:String;
  dis:boolean;

  func(x,y,z,w){
    this.firstname=x;
    this.lastname=y;
    this.phnumb=z;
    this.passwrd=w;
    w='';
    y='';
    x='';
    z='';
    console.log(this.firstname);
    console.log(this.lastname);
    console.log(this.phnumb);
    console.log(this.passwrd);
    
  }
  user:any;
  signError : string;
  str : string;
  submit(signupform : NgForm){
    this.str=signupform.value.phone;
    if(this.str.match("/^[0-9]+$/")){
      window.alert("Numbers okay");
    }
    this.user={firstName:signupform.value.firstName,
      lastName:signupform.value.lastName,
      phone:signupform.value.phone,
      usertype:signupform.value.usertype,
      password:signupform.value.password
    };
    if(signupform.value.password==signupform.value.cpassword && signupform.valid){
      console.log("user : "+this.user.password);
      this.loginservice.signup(this.user);
    }else{
      this.signError="Passwords not matching !!!";
    
    }

  }

}

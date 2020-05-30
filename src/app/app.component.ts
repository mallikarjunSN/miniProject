import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { PropService } from './services/prop.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'demo';
  theme : string;
  constructor(public dialog: MatDialog,private loginService : LoginService,private router:Router,private propService:PropService){}
  logged_in:Boolean=false;

  private login_update = new Subscription;
  private user_update = new Subscription;
  private notif_update = new Subscription;

  user:User;

  pop_flag:boolean;
  cat_flag:boolean;

  notif_count:number;

  popular:String[]=["Bengaluru","Chennai","Mumbai","Delhi"];
  category:String[]=["Family","Student","Job Seeker","Short term"];
  notifications:any[]=[];
  ngOnInit(){
    this.pop_flag=false;
    this.cat_flag=false;
    this.login_update=this.loginService.getLoginUpdateListener()
    .subscribe((loggedIn:Boolean)=>{
      this.logged_in=loggedIn;
    });

    this.user=this.loginService.user;
    this.user_update=this.loginService.getUserUpdateListener()
    .subscribe((user:any)=>{
      this.user=user;
    });

    
    this.notifications=this.propService.notifications;
    this.notif_update=this.propService.getNotifUpdateListener()
    .subscribe((notifs:any[])=>{
      this.notifications=notifs;
      this.notif_count=notifs.length;
    });
    
  }
  str:String="";

  navigate(lin:String){
    this.str="";
    this.str+=lin.toLowerCase();
    console.log(this.str);
    this.router.navigate(["/search",this.str]);
  }
  
  account(){
    console.log(this.user);
    if(this.user.usertype=="owner")
      this.router.navigate(["/ownerac"]);
    else
      this.router.navigate(["/renterac"]);
  }

  key:string;
  search(searchForm:NgForm){
    console.log("search content "+searchForm.value.keyword);
    this.key=searchForm.value.keyword;

    this.router.navigate(["/search",this.key]);
    // this.propService.searchProp(searchForm.value.keyword);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '500px'
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}

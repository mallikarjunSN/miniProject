import { Component, OnInit } from '@angular/core';
import { Country } from '../models/country.model';
import { CountryService } from '../services/country.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private countryService : CountryService,private router: Router) { }


  private countrySub = new Subscription; 

  

  variable : any;
  public countries : any[];
  
  public nations : Country[];

  opened = false;

  str :string;
  result : any;

  i : Number = 0;

  poster:string="";

  current:number=0;

  ngOnInit() {
    //this.countryService.getCountryService();
    this.current=0;
    this.poster="../../assets/offers/offer0.jpg";
  }

  changePoster(){
    while(true){
      delay(1000);
      this.current++;
    }
  }

  getdata(){
    this.countryService.getCountryService();
  }

  hello(){
    this.router.navigate(["/login"]);
    console.log("Hello called");
  }
  

  change(code:any){
    if(code==1){
      if(this.current==0)this.current=4;
      this.current=Math.abs((this.current-1)%4);
      this.poster="../../assets/offers/offer"+this.current+".jpg";
      // window.alert("pressed previous button "+this.current);
    }else{
      this.current=(this.current+1)%4;
      this.poster="../../assets/offers/offer"+this.current+".jpg";
      // window.alert("pressed next button "+this.current);
    }
    

  }


  city(choice:number){
    switch(choice){
      case 1:window.alert("Bengaluru");break;
      case 2:window.alert("Chennai");break;
      case 3:window.alert("Lucknow");break;
      case 4:window.alert("Mumbai");break;

    }
  }

  scroll(){
    let top=document.getElementById('top');
    top.scrollIntoView();
  }

  navigate(str:string){
    this.router.navigate(["/search",str]);
  }
}

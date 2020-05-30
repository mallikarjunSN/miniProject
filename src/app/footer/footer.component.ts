import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router:Router) { }

  popular:String[]=["Bengaluru","Chennai","Mumbai","Delhi"];
  category:String[]=["Family","Student","Job Seeker","Short term"];
  
  ngOnInit() {
  }
  str:string;
  navigate(lin:String){
    this.str="";
    this.str+=lin.toLowerCase();
    console.log(this.str);
    this.router.navigate(["/search",this.str]);
  }

}

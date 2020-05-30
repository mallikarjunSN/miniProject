import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css']
})
export class TempComponent implements OnInit {

  constructor() { }


  str:string[]=[];
  
  
  ngOnInit() {
    this.hello();
  }

  hello(){
    this.str.push("hello zero");
    this.str.push("hello one");
    this.str.push("hello two");
  }

}

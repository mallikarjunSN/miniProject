import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {

  constructor(private http:HttpClient) { }

  data:any={id:"23",name:"malli"};
    // {id:"24",name:"manj"},
    // {id:"25",name:"keer"},
    // {id:"26",name:"loki"},
    // {id:"27",name:"rahul"},

  selected:string[]=[];

  str:string="jdsdbddj";

  ngOnInit() {
    this.str="10";
  }

  fullscreen:boolean=false;

  print(){
    console.log("length "+this.selected.length);
    for(let i of this.selected){
      console.log("i=="+i);
    }
  }

  submit(formm:NgForm){
    console.log(formm.value);
  }

  d:any;
  getdatetime(){
    let date=new Date();

    // let data={date:}
    // let d = formatDate(this.today, 'dd-MM-yyyy hh:mm:ss a', 'en-US', '+0530');
    this.d = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
    // this.d=this.d.replace("Z"," ");
    console.log(this.d);
  }
  
}
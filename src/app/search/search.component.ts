import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PropService } from '../services/prop.service';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { isString } from 'util';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {


  mySubscription: any;
  length:any;

  constructor(private propService:PropService,private activatedRoute:ActivatedRoute,private router:Router) { 
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof SearchComponent) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  private search_update = new Subscription;

  properties:any[];
  str:string;
  ngOnInit() {

    this.str= this.activatedRoute.snapshot.paramMap.get("id");
    console.log("search "+this.str);
    this.propService.searchProp(this.str);

    this.search_update=this.propService.getsearchUpdateListener()
    .subscribe((data:any[])=>{
      this.properties=data;
      this.length=this.properties.length;
    });
  }

  title:string = "Search Results....";
  btnClicked:boolean = false;
  btnClickedRoom:boolean = false;
  displayingRoom:number;


  sortData:any[]=[];
  sort(str:string){

    console.log("sort "+str);
    this.sortData=this.properties;
    console.log(this.properties);
    this.properties= this.sortData.sort((a, b) => {
      const isAsc = true;
      switch (str) {
        case 'houseno': return compare(a.houseno, b.houseno, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'bhk': return compare(a.bhk, b.bhk, isAsc);
        case 'rent_amt': return compare(a.rent_amt, b.rent_amt, isAsc);
        default:return 0;
      }
    });
  }
  reverse(){
    this.properties.reverse();
  }

  viewProp(prop:any){
    this.propService.getProp({ownerid:prop.ownerid,houseno:prop.houseno});
    this.router.navigate(["/prop",prop.ownerid,prop.houseno]);
  }

  /*
  rooms:room[]=[
    {name:'krishna',street:'BH Road',area:'shivkumarswamy circle',city:'tumkur'},
    {name:'rama',street:'AV Road',area:'whiteField',city:'bengaluru'},
    {name:'shiva',street:'CH Road',area:'malgudi',city:'bengaluru'},
    {name:'ravi',street:'DH Road',area:'electron city',city:'bengaluru'},
    {name:'soori',street:'EH Road',area:'malleshvara',city:'bengaluru'},
    {name:'popcornMonkeytiger',street:'FH Road',area:'myaglalli',city:'mysore'},
  ]

  displaySearchResUponBtnClck(){
    this.btnClicked = !this.btnClicked;
  }
  displayClickedRoom(x:number){
    this.btnClicked = false; 
    this.btnClickedRoom = true;
    this.displayingRoom = x;
    console.log(this.displayingRoom);
  }

  btnBack(){
    this.btnClickedRoom = false;
    this.btnClicked=true;
  }

  */


 ngOnDestroy() {
  if (this.mySubscription) {
    this.mySubscription.unsubscribe();
  }
}


}

class room{
  name:string;
  street:string;
  area:string;
  city:string;
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  if(isString(a) && isString(b)){
    a=a.toString();a=a.toLowerCase();
    b=b.toString();
    b=b.toLowerCase();
  }
  
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

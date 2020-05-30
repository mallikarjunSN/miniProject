import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../models/property.model';
import { PropService } from '../services/prop.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-prop',
  templateUrl: './edit-prop.component.html',
  styleUrls: ['./edit-prop.component.css']
})
export class EditPropComponent implements OnInit {
  ownerid:string;
  houseno:string;

  prop_sub = new Subscription;

  constructor(private activatedRoute:ActivatedRoute,private propService:PropService) { 
    this.ownerid=this.activatedRoute.snapshot.paramMap.get('id1');
    this.houseno=this.activatedRoute.snapshot.paramMap.get('id2');
  }

  prop:Property;
  data:any;
  ngOnInit() {

    this.data={ownerid:this.ownerid,houseno:this.houseno};

    this.propService.getProp(this.data);
    this.prop=this.propService.propFn();
    this.prop_sub=this.propService.getPropUpdateListener()
    .subscribe((prop)=>{
      this.prop=prop[0];
      console.log(this.prop);
    });


    console.log("in edit prop "+this.ownerid+this.houseno);

  }

  property:Property;
  submit(editForm : NgForm){
    this.property=this.prop;
    //console.log(editForm);

    this.property.houseno=this.prop.houseno;
    this.property.name=((editForm.value.name=="")? this.prop.name : editForm.value.name);
    this.property.bhk = ((editForm.value.bhk=="")? this.prop.bhk : editForm.value.bhk);
    this.property.street=((editForm.value.street=="")? this.prop.street : editForm.value.street);
    this.property.city=((editForm.value.city=="")? this.prop.city : editForm.value.city);
    this.property.landmark=((editForm.value.landmark=="")? this.prop.landmark : editForm.value.landmark);
    this.property.state=((editForm.value.state=="")? this.prop.state : editForm.value.state);
    this.property.rent_amt=((editForm.value.rent_amt=="")? this.prop.rent_amt : editForm.value.rent_amt);
    this.property.pin = ((editForm.value.pin=="") ? this.prop.pin : editForm.value.pin);
    this.property.suitable=((editForm.value.suitable=="")? this.prop.suitable : editForm.value.suitable);
    this.property.more=((editForm.value.more=="")? this.prop.more : editForm.value.more);

    console.log(this.property);
    this.propService.editProp(this.property);
    //this.message=this.loginservice.login(this.user);

  }

}

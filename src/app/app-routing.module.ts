import { NgModule,Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { SignupComponent } from './signup/signup.component';
import { ImgComponent } from './img/img.component';
import { OwnerAcComponent } from './owner-ac/owner-ac.component';
import { RenterAcComponent } from './renter-ac/renter-ac.component';
import { AddPropComponent } from './add-prop/add-prop.component';
import { SearchComponent } from './search/search.component';
import { EditPropComponent } from './edit-prop/edit-prop.component';
import { PropComponent } from './prop/prop.component';
import { TempComponent } from './temp/temp.component';


const routes: Routes = [
  {path:'home', component : HomeComponent},
  {path:'', redirectTo:'/home', pathMatch : 'full'},
  {path:'new' , component : NewComponentComponent},
  {path:'login' , component : LoginComponent},
  {path:'account' ,component : AccountComponent},
  {path:'signup',component:SignupComponent},
  {path:'img',component:ImgComponent},
  {path:'ownerac',component:OwnerAcComponent},
  {path:'renterac',component:RenterAcComponent},
  {path:'addprop',component:AddPropComponent},
  {path:'search',component:SearchComponent},
  {path:'search/:id', component:SearchComponent},
  {path:'editProp/:id1/:id2',component:EditPropComponent},
  {path:'prop/:id1/:id2',component:PropComponent},
  {path:'payment/:id1/:id2/:id3',component:NewComponentComponent},
  {path:'temp',component:TempComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

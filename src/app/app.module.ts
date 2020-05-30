import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewComponentComponent } from './new-component/new-component.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule} from '@angular/material/menu';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule} from '@angular/material/dialog';
import { MatSelectModule} from '@angular/material/select';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTabsModule} from '@angular/material/tabs';
import { MatGridListModule} from '@angular/material/grid-list';
import { MatBadgeModule} from '@angular/material/badge';



import { FooterComponent } from './footer/footer.component';

import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule} from '@angular/material/sort';

import { SignupComponent } from './signup/signup.component';
import { ImgComponent } from './img/img.component';
import { TempComponent } from './temp/temp.component';
import { OwnerAcComponent } from './owner-ac/owner-ac.component';
import { RenterAcComponent } from './renter-ac/renter-ac.component';
import { AddPropComponent } from './add-prop/add-prop.component';
import { SearchComponent } from './search/search.component';
import { EditPropComponent } from './edit-prop/edit-prop.component';
import { PropComponent } from './prop/prop.component';

@NgModule({
  declarations: [
    AppComponent,
    NewComponentComponent,
    HomeComponent,
    LoginComponent,
    AccountComponent,
    MainNavComponent,
    ToolbarComponent,
    FooterComponent,
    SignupComponent,
    ImgComponent,
    TempComponent,
    OwnerAcComponent,
    RenterAcComponent,
    AddPropComponent,
    SearchComponent,
    EditPropComponent,
    PropComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatCardModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSortModule,
    MatGridListModule,
    MatBadgeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

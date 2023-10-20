import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgFor} from '@angular/common';


import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CdkDropList, NgFor, CdkDrag,
    ToastrModule.forRoot({
      closeButton: true,
      preventDuplicates: true,
      timeOut: 3000,
      progressBar: true,
      positionClass: "toast-bottom-right"
    }),
    BrowserAnimationsModule,
   
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

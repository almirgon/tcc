import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'profile-photo',
  templateUrl: './profile-photo.component.html',
  styleUrls: ['./profile-photo.component.css']
})
export class ProfilePhotoComponent implements OnInit {

  loading: boolean;
  public hasDragOver = false;
  
  constructor() {
  
  }

  public fileOver(e: any): void {
    this.hasDragOver = e;
  }

  ngOnInit() {
  }

  noPhoto(){

  }

  endItUp(){
    this.loading = true;

  }

}

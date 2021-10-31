import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-display-post-images',
  templateUrl: './display-post-images.component.html',
  styleUrls: ['./display-post-images.component.css']
})
export class DisplayPostImagesComponent implements OnInit {

  imageUrls!: string[];

  constructor(
    public dialogRef: MatDialogRef<DisplayPostImagesComponent>,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  onClose()
  {
    this.dialogRef.close();
  }

  loadData(){
    this.imageUrls = [];
    this.imageUrls = this.dataService.imageUrls;
    //console.log(this.imageUrls);
  }

}

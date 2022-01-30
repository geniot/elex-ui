import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AboutModel} from "../model/aboutmodel";

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit {
  keys:string[] = [];
  values:string[] = [];

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    let aboutModel: AboutModel = config.data.aboutModel;
    this.keys = Object.keys(aboutModel.abouts);
    this.values = Object.values(aboutModel.abouts);
  }

  ngOnInit(): void {
  }

}

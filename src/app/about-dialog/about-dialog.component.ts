import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {AboutModel} from "../model/aboutmodel";

@Component({
  selector: 'app-about-dialog',
  templateUrl: './about-dialog.component.html',
  styleUrls: ['./about-dialog.component.css']
})
export class AboutDialogComponent implements OnInit, AfterContentInit {
  keys: string[] = [];
  values: string[] = [];
  @ViewChild('focusElement') focusElement: ElementRef;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    let aboutModel: AboutModel = config.data.aboutModel;
    this.keys = Object.keys(aboutModel.abouts);
    this.values = Object.values(aboutModel.abouts);
  }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.focusElement.nativeElement.focus();
    }, 50);
  }

}

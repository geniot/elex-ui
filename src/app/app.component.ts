import {Component, HostListener} from '@angular/core';
import {IOutputData} from "angular-split";
import {cloneDeep} from 'lodash'
import {InfoService} from "./info.service";
import {LayoutConfig} from "./model/layoutconfig";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  splitLayoutLocalStorageName = 'elex-splitLayoutLocalStorageName';
  config: LayoutConfig = null;
  defaultConfig: LayoutConfig = new LayoutConfig();
  isScreenNarrow: boolean = false;
  contentViewName:string = "index";

  constructor(private infoService: InfoService) {
  }

  ngOnInit() {
    /**
     * Mobile (Smartphone) max-width: 480px
     * Low Resolution Tablets and ipads max-width: 767px
     */
    this.infoService.changeWidth.asObservable().subscribe(
      width => {
        this.isScreenNarrow = this.infoService.isScreenNarrow();
      });

    this.infoService.selectedHeadword.asObservable().subscribe(
      hw => {
        this.contentViewName = "article";
      });

    if (localStorage.getItem(this.splitLayoutLocalStorageName)) {
      this.config = JSON.parse(localStorage.getItem(this.splitLayoutLocalStorageName))
    } else {
      this.resetConfig()
    }
    window.dispatchEvent(new Event('resize'));
    this.infoService.updateModel();
  }

  resetConfig() {
    this.config = cloneDeep(this.defaultConfig)
    localStorage.removeItem(this.splitLayoutLocalStorageName)
  }

  onDragEnd(e: IOutputData) {
    this.config.columns[0].size = e.sizes[0] as number;
    this.config.columns[1].size = e.sizes[1] as number;
    this.config.columns[2].size = e.sizes[2] as number;
    this.saveLocalStorage()
  }

  saveLocalStorage() {
    localStorage.setItem(this.splitLayoutLocalStorageName, JSON.stringify(this.config))
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    this.infoService.changeHeight.next(target.innerHeight);
    this.infoService.changeWidth.next(target.innerWidth);
  }
}

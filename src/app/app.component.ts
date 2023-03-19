import {Component, HostListener} from '@angular/core';
import {IOutputData} from "angular-split";
import {cloneDeep} from 'lodash-es'
import {InfoService} from "./info.service";
import {LayoutConfig} from "./model/layoutconfig";
import {Action} from "./model/action";
import {DialogService} from "primeng/dynamicdialog";
import {AboutDialogComponent} from "./about-dialog/about-dialog.component";
import {DestroyableComponent} from "./destroyablecomponent";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends DestroyableComponent {
  splitLayoutLocalStorageName = 'elex-splitLayoutLocalStorageName';
  config: LayoutConfig;
  defaultConfig: LayoutConfig = new LayoutConfig();
  isScreenNarrow: boolean = false;
  //narrow-view specific:
  contentViewName: string = "index";
  ftSearchResultsCount: number = 0;

  constructor(private infoService: InfoService, public dialogService: DialogService) {
    super();
  }

  ngOnInit() {
    /**
     * Mobile (Smartphone) max-width: 480px
     * Low Resolution Tablets and ipads max-width: 767px
     */
    this.subscriptions.push(this.infoService.changeWidth.asObservable().subscribe(
      () => {
        this.isScreenNarrow = this.infoService.isScreenNarrow();
      }));


    this.subscriptions.push(this.infoService.model.asObservable().subscribe(
      model => {
        if (model.action == Action.INDEX ||
          model.action == Action.FT_LINK ||
          (model.action == Action.SEARCH && model.exactMatch)) {
          this.contentViewName = "article";
        }
      }));

    this.subscriptions.push(this.infoService.ftModel.asObservable().subscribe(
      ftModel => {
        this.ftSearchResultsCount = ftModel.searchResults.length;
      }));

    this.subscriptions.push(this.infoService.aboutModel.asObservable().subscribe(
      aboutModel => {
        if (Object.keys(aboutModel.abouts).length > 0) {
          this.dialogService.open(AboutDialogComponent, {
            data: {
              aboutModel: aboutModel
            },
            header: aboutModel.dictionary.name,
            width: '70%'
          });
        }
      }));

    this.subscriptions.push(this.infoService.changeView.asObservable().subscribe(
      columns => {
        if (this.config != null) {
          for (let i = 0; i < this.config.columns.length; i++) {
            if (i < columns.valueOf()) {
              this.config.columns[i].visible = true;
            } else {
              this.config.columns[i].visible = false;
            }
          }
          this.saveLocalStorage();
        }
      }));

    if (localStorage.getItem(this.splitLayoutLocalStorageName)) {
      this.config = JSON.parse(localStorage.getItem(this.splitLayoutLocalStorageName)!);
      //in rare cases we may want to add/remove columns and we need to stay in sync
      if (this.config.columns.length != this.defaultConfig.columns.length) {
        this.resetConfig();
      }
    } else {
      this.resetConfig();
    }

    let visibleViews: number = 0;
    for (let i = 0; i < this.config.columns.length; i++) {
      visibleViews += this.config.columns[i].visible ? 1 : 0;
    }
    this.infoService.changeView.next(visibleViews);

    window.dispatchEvent(new Event('resize'));
    this.infoService.updateModel();
  }

  resetConfig(): void {
    this.config = cloneDeep(this.defaultConfig);
    localStorage.removeItem(this.splitLayoutLocalStorageName);
  }

  onDragEnd(e: IOutputData) {
    for (let i = 0; i < e.sizes.length; i++) {
      this.config.columns[i].size = e.sizes[i] as number;
    }
    this.saveLocalStorage();
  }

  saveLocalStorage() {
    localStorage.setItem(this.splitLayoutLocalStorageName, JSON.stringify(this.config))
  }

  @HostListener('window:resize', ['$event.target'])
  public onResize(target) {
    if (!this.infoService.isScreenNarrow()) {
      this.infoService.changeHeight.next(target.innerHeight);
    }
    this.infoService.changeWidth.next(target.innerWidth);
  }
}

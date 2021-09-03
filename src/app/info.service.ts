import {Injectable} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';
import {Model} from "./model/model";
import {HttpClient} from "@angular/common/http";
import {debounceTime, throttleTime} from "rxjs/operators";
import {Action} from "./model/action";
import {environment} from "../environments/environment";


@Injectable({providedIn: 'root'})
export class InfoService {
  baseApiUrl = environment.BASE_API_URL;

  modelLocalStorageName = 'elex-modelLocalStorageName';
  private dataUrl = this.baseApiUrl + '/data';
  public cssUrl = this.baseApiUrl + '/css';

  model: BehaviorSubject<Model> = new BehaviorSubject(new Model());
  changeSize = new Subject();
  mouseWheelChangeValue = new Subject();

  constructor(public http: HttpClient) {
    let m: Model = new Model();
    m.selectedIndex = Math.round(this.visibleIndexSize()/2);
    if (localStorage.getItem(this.modelLocalStorageName)) {
      m = JSON.parse(localStorage.getItem(this.modelLocalStorageName));
    }
    m.baseApiUrl = this.baseApiUrl;
    this.model.next(m);
    this.model.value.userInputs = new Map();

    this.changeSize
      .asObservable()
      .pipe(debounceTime(100))
      .subscribe(innerHeight => {
        let visibleIndexSize = this.visibleIndexSize();
        if (visibleIndexSize != this.model.value.visibleSize) {
          this.updateModel();
        }
      });

    this.mouseWheelChangeValue
      .asObservable()
      .pipe(debounceTime(50))
      .subscribe(deltaY => {
        if (deltaY > 0) {
          this.model.value.action = Action.NEXT_WORD;
        } else {
          this.model.value.action = Action.PREVIOUS_WORD;
        }
        this.updateModel();
      });
  }

  updateModel() {
    this.model.value.visibleSize = this.visibleIndexSize();
    this.model.value.entries = [];
    // this.model.value.searchResults = [];
    this.http.post<Model>(this.dataUrl, JSON.stringify(this.model.value)).subscribe(model => {
      localStorage.setItem(this.modelLocalStorageName, JSON.stringify(model));
      this.model.next(model);
    });
  }

  visibleIndexSize(): number {
    return Math.floor((Number(window.innerHeight) - 70 - 25) / 30);
  }

  public setSelectedHeadword(hw: string): void {
    let key = this.getSelectedSourceLanguage();// + "-" + this.getSelectedTargetLanguage();
    this.model.value.selectedHeadwords[key] = hw;
  }

  public getSelectedSourceLanguage(): string {
    for (let lang of this.model.value.sourceLanguages) {
      if (lang.selected) {
        return lang.sourceCode;
      }
    }
    return "";
  }

  public getSelectedTargetLanguage(): string {
    for (let lang of this.model.value.sourceLanguages) {
      if (lang.selected) {
        for (let tLang of lang.targetLanguages) {
          if (tLang.selected) {
            return tLang.sourceCode;
          }
        }
      }
    }
    return "";
  }

  saveState() {
    localStorage.setItem(this.modelLocalStorageName, JSON.stringify(this.model.value));
  }

  pageForward() {
    if (!this.model.value.endReached) {
      this.model.value.action = Action.NEXT_PAGE;
      this.updateModel();
    }
  }

  pageBack() {
    if (!this.model.value.startReached) {
      this.model.value.action = Action.PREVIOUS_PAGE;
      this.updateModel();
    }
  }
}

import {Injectable} from '@angular/core';

import {BehaviorSubject, Subject} from 'rxjs';
import {Model} from "./model/model";
import {HttpClient} from "@angular/common/http";
import {debounceTime} from "rxjs/operators";
import {Action} from "./model/action";
import {environment} from "../environments/environment";
import {FtModel} from "./model/ftmodel";
import {Dictionary} from "./model/dictionary";
import {AboutModel} from "./model/aboutmodel";
import {AdminModel} from "./model/adminmodel";
import {TaskExecutorModel} from "./model/taskexecutormodel";
import {AdminDictionary} from "./model/admindictionary";


@Injectable({providedIn: 'root'})
export class InfoService {
  baseApiUrl = environment.BASE_API_URL;

  modelLocalStorageName = 'elex-modelLocalStorageName';

  private dataUrl = this.baseApiUrl + '/data';
  private aboutUrl = this.baseApiUrl + '/about';
  private ftUrl = this.baseApiUrl + '/ft';
  public cssUrl = this.baseApiUrl + '/css';

  model: BehaviorSubject<Model> = new BehaviorSubject(new Model());
  adminModel: BehaviorSubject<AdminModel> = new BehaviorSubject(new AdminModel());
  ftModel: BehaviorSubject<FtModel> = new BehaviorSubject(new FtModel());
  aboutModel: BehaviorSubject<AboutModel> = new BehaviorSubject(new AboutModel());
  changeHeight: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  changeWidth: BehaviorSubject<Number> = new BehaviorSubject<Number>(0);
  changeView: BehaviorSubject<Number> = new BehaviorSubject<Number>(3);
  closeDialog: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(false);
  taskExecutorUrl = this.baseApiUrl + '/admin/tasks';
  taskExecutorModel: BehaviorSubject<TaskExecutorModel> = new BehaviorSubject(new TaskExecutorModel());
  selectedDictionary: BehaviorSubject<AdminDictionary> = new BehaviorSubject(AdminDictionary.EMPTY);
  /**
   * To switch view from index to article in narrow screen we keep track of the changed selected headword
   */
  selectedHeadword: BehaviorSubject<String> = new BehaviorSubject<String>("");
  mouseWheelChangeValue = new Subject();

  constructor(public http: HttpClient) {
    this.changeHeight.next(window.innerHeight);

    let m: Model = new Model();
    m.selectedIndex = Math.round(this.visibleIndexSize() / 2);
    if (localStorage.getItem(this.modelLocalStorageName)) {
      m = JSON.parse(localStorage.getItem(this.modelLocalStorageName)!);
      m.action = Action.INIT;
    }
    m.baseApiUrl = this.baseApiUrl;
    this.model.next(m);
    this.model.value.userInputs = new Map();


    this.changeHeight
      .asObservable()
      .pipe(debounceTime(100))
      .subscribe(() => {
        let visibleIndexSize = this.visibleIndexSize();
        if (visibleIndexSize != this.model.value.visibleSize) {
          this.updateModel();
        }
      });

    this.mouseWheelChangeValue
      .asObservable()
      .pipe(debounceTime(50))
      .subscribe(deltaY => {
        if ((deltaY as number) > 0) {
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
    // ft request
    if (this.model.value.action != Action.FT_LINK && this.changeView.value > 2) {
      this.http.post<FtModel>(this.ftUrl, JSON.stringify(this.model.value)).subscribe(ftModel => {
        this.model.value.searchResultsFor = ftModel.searchResultsFor;
        localStorage.setItem(this.modelLocalStorageName, JSON.stringify(this.model.value));
        this.ftModel.next(ftModel);
      });
    }
  }

  visibleIndexSize(): number {
    let extras: number = 95;
    if (this.isScreenNarrow()) {
      extras += 35;
    }
    return Math.floor((Number(this.changeHeight.value) - extras) / 35);
  }

  public setSelectedHeadword(hw: string): void {
    this.selectedHeadword.next(hw);
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

  isScreenNarrow(): boolean {
    return this.changeWidth.value <= 767;
  }

  getDictionaryNameById(dictionaryId: number) {
    for (let dictionary of this.model.value.dictionaries) {
      if (dictionary.id == dictionaryId) {
        return dictionary.name;
      }
    }
    return "";
  }

  public onAbout(dictionary: Dictionary): void {
    this.aboutModel.value.dictionary = dictionary;
    this.aboutModel.value.abouts = new Map();
    this.http.post<AboutModel>(this.aboutUrl, JSON.stringify(this.aboutModel.value)).subscribe(model => {
      this.aboutModel.next(model);
    });
  }

  public onAdmin(): void {
    alert('admin')
    // this.aboutModel.value.dictionary = dictionary;
    // this.aboutModel.value.abouts = new Map();
    // this.http.post<AboutModel>(this.aboutUrl, JSON.stringify(this.aboutModel.value)).subscribe(model => {
    //   this.aboutModel.next(model);
    // });
  }

  setSelectedSourceLanguageCode(newValue: string) {
    for (let lang of this.model.value.sourceLanguages) {
      if (newValue == lang.sourceCode) {
        lang.selected = true;
      } else {
        lang.selected = false;
      }
    }
  }

  setSelectedTargetLanguageCode(selectedSourceLanguageCode: string, newValue: string) {
    for (let sourceLanguage of this.model.value.sourceLanguages) {
      if (selectedSourceLanguageCode == sourceLanguage.sourceCode) {
        for (let targetLanguage of sourceLanguage.targetLanguages) {
          if (newValue == targetLanguage.sourceCode) {
            targetLanguage.selected = true;
          } else {
            targetLanguage.selected = false;
          }
        }
      }
    }
  }

  updateTaskExecutorModel() {
    this.http.get<TaskExecutorModel>(this.taskExecutorUrl).subscribe(model => {
      this.taskExecutorModel.next(model);
    });
  }
}

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularSplitModule} from 'angular-split';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";

import { FulltextPanelComponent } from './fulltext-panel/fulltext-panel.component';
import { IndexPanelComponent } from './index-panel/index-panel.component';

import { ContentsPanelComponent } from './contents-panel/contents-panel.component';
import { ContentsToolbarComponent } from './contents-panel/contents-toolbar/contents-toolbar.component';
import { LanguageSelectorComponent } from './contents-panel/contents-toolbar/language-selector/language-selector.component';
import { DictionaryButtonComponent } from './contents-panel/contents-toolbar/dictionary-button/dictionary-button.component';

import {InfoService} from "./info.service";
import { IndexComponent } from './index-panel/index/index.component';
import { SearchComponent } from './index-panel/search/search.component';
import {PaginationComponent} from "./index-panel/pagination/pagination.component";


@NgModule({
  declarations: [
    AppComponent,
    IndexPanelComponent,
    ContentsPanelComponent,
    FulltextPanelComponent,
    ContentsToolbarComponent,
    LanguageSelectorComponent,
    DictionaryButtonComponent,
    IndexComponent,
    SearchComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AngularSplitModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [InfoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
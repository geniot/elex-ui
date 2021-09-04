import {Language} from "./language";
import {Entry} from "./entry";
import {FullTextHit} from "./fulltexthit";
import {Dictionary} from "./dictionary";
import {Headword} from "./headword";
import {Action} from "./action";

export class Model {
  sourceLanguages: Language[] = [];
  dictionaries: Dictionary[] = [];
  headwords: Headword[] = [];
  entries: Entry[] = [];
  searchResults: FullTextHit[] = [];
  startReached: boolean = false;
  endReached: boolean = false;
  lockFullText: boolean = false;

  selectedHeadwords: Map<string, string> = new Map();
  userInputs: Map<string, string> = new Map();
  ftLink: String;
  visibleSize: number = 0;
  selectedIndex: number = 0;
  searchResultsFor: string;
  exactMatch:boolean = false;

  action: Action = Action.INDEX;
  baseApiUrl:String;
}



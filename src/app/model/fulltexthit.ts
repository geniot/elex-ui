import {Headword} from "./headword";

export interface FullTextHit {
  dictionaryIds: number[];
  headword: Headword;
  extracts: String[];
  scores: number[];
}

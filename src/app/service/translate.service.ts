import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  
  de:boolean= true;
  en:boolean= false;

  constructor() { }
  


  translateTorgle(){
    this.de = !this.de;
    this.en = !this.en;
  }
}

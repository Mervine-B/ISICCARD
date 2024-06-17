import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor( 
    private router :Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

  
  reloadComponent(uri: string, fragment: string = ""){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      if (fragment != "")
        this.router.navigate([uri], { fragment: 'affectation' });
      else
        this.router.navigate([uri])
      });
    }

  getItem(key: string): string | null | undefined {
    return this.document?.defaultView?.localStorage?.getItem(key);
  }
  
}

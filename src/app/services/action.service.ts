import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  private currentAction: string = '';

  constructor() { }

  setAction(action: string) {
    this.currentAction = action;
  }

  getAction(): string {
    return this.currentAction;
  }
}

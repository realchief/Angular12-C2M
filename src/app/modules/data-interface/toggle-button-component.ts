import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'toggle-button',
  template: `
    <input type="checkbox"  />
    <label class="toggle-button-switch"  
       (click)="changeCheckbox($event)"></label>
    <div class="toggle-button-text">
      <div class="toggle-button-text-on">ON</div>
      <div class="toggle-button-text-off">OFF</div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      width: 100px;
      height: 26px;
    }
    
    input[type="checkbox"] {
      display: none; 
    }

   
    .toggle-button-switch {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 23px;
      height: 23px;
      background-color: red;
      border-radius: 100%;
      cursor: pointer;
      z-index: 100;
      transition: left 0.3s;
    }

   
    .toggle-button-text {
      height: 26px;
      width: 50px;
      overflow: hidden;
      background-color: #fff;
      border-radius: 25px;
      box-shadow: 2px 2px 5px 0 rgba(50, 50, 50, 0.75);
      transition: background-color 0.3s;
    }

  
    .toggle-button-text-on,
    .toggle-button-text-off {
      float: left;
      width: 50%;
      height: 100%;
      line-height: 25px;
      font-family: Lato, sans-serif;
      font-weight: bold;
      color: #fc3164;
      text-align: center;
      font-size: 10px;
    }

   
    input[type="checkbox"]:checked ~ .toggle-button-switch {
      left: 26px;
    }

    
    input[type="checkbox"]:checked ~ .toggle-button-text {
      background-color: #fff;
    }
  `]
})
export class ToggleButtonComponent  {
  @Output() changed = new EventEmitter<boolean>();
  changeCheckbox(event :any) {
      var target = event.target;
      var previousEle = target.previousSibling;
      previousEle.checked = !previousEle.checked;
      this.changed.emit(previousEle.checked);
  }
}

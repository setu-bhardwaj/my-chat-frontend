import { Component, OnChanges, Input, EventEmitter, Output, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'first-char',
  templateUrl: './first-char.component.html',
  styleUrls: ['./first-char.component.css']
})
export class FirstCharComponent implements OnInit,OnChanges {

  @Input() name: string;
  @Input() userBg: string;
  @Input() userColor: string;

  public firstChar: string;
  private _name:string = '';

  //infoming parent component from child
  @Output()
  notify: EventEmitter<String> = new EventEmitter<String>();



  ngOnInit(): void {
      this._name = this.name;
      this.firstChar = this._name[0];

  } // end ngOnInit

//detecting chnage and informing child comp, here two way binding doesnt work between parent and child.
  ngOnChanges(changes: SimpleChanges){
    let name  = changes.name;
    this._name = name.currentValue;
    this.firstChar = this._name[0];
  }


  nameClicked(){
    this.notify.emit(this._name);
  }

  

   


  }// end show full name
  


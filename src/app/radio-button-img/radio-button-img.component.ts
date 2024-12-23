import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'radio-button-img',
  templateUrl: './radio-button-img.component.html',
  styleUrls: ['./radio-button-img.component.scss'],
  standalone: true
})
export class RadioButtonImgComponent  implements OnInit,ControlValueAccessor {
  
  @Input({required: true}) label!: string
  @Input({required: true}) name! : string
  @Input({required: true}) src!: string
  @Input({required: true}) value!: string
  
  val = ""

  constructor() { }
  onTouch = ()=>{

  }

  onChange = (value: string)=>{

  }

  writeValue(value: string): void {
      this.val = value
  }

  registerOnChange(fn: any): void {
      this.onChange = fn
  }
  registerOnTouched(fn: any): void {
      this.onTouch = fn
  }

  ngOnInit() {}

}

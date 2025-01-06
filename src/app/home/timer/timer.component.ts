import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent  implements OnDestroy,AfterViewInit {

  displayTime = "0"

  @Input()
  timerLeft = 120

  private subscription = new Subscription()

  @Output() 
  timerComplete = new EventEmitter<void>()

  constructor() { }

  ngAfterViewInit() {
      this.displayTime = this.timerLeft.toString()
  }

  startTimer(){
    this.subscription = interval(1000).subscribe(()=>{
      if(this.timerLeft > 0 ){
        this.timerLeft--

        this.updateDisplayTime()
      }else{
        this.subscription.unsubscribe()
        this.timerComplete.emit()
      }
    })
  }

  updateDisplayTime(){
    const minutes = Math.floor(this.timerLeft / 60)
    const secondes = this.timerLeft % 60
    // this.displayTime = `${this.formatNumber(minutes)}:${this.formatNumber(secondes)}`
    this.displayTime = this.formatNumber2(minutes,secondes)
  }


  
  formatNumber(num: number){
    return num < 10?`0${num}`:`${num}`
  }

  formatNumber2(minutes:number,secondes:number):string{
    let result = ""
    if(minutes>0 && secondes>=10)
      result+=`${minutes}:${secondes}`
    else if(minutes>0 && secondes<10)
      result+=`${minutes}:0${secondes}`
    else
      result = `${secondes}`
    return result
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}

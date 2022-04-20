import {Component, DoCheck, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {CalendarService} from "../../services/calendar.service";
import {Observable} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-calendar-layouts',
  templateUrl: './calendar-layouts.component.html',
  styleUrls: ['./calendar-layouts.component.scss']
})

export class CalendarLayoutsComponent implements OnInit, DoCheck {
  public staticDoubleArray: any[] = [];

  public activePath!: string;
  public currentYear$!: Observable<string>;
  public currentMonth$!: Observable<string>;
  data!:any[];

  currentDay!: number;
  currenDayOnWeek!: number;

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {

    this.calendarService.generateCalendar();
    this.currentMonth$ = this.calendarService.currenMonthString;
    this.currentYear$ = this.calendarService.currenYearString;
    this.calendarService.currenDay
      .pipe(untilDestroyed(this))
      .subscribe(currentDay => {
      this.currentDay = currentDay
    })

    this.data = this.calendarService.prepareDataToWeekLayout();
    this.generateWeekDaysArray();
    console.log(this.data);
    this.findIndexInDoubleArray();

    this.calendarService.currenDayOnWeek
      .pipe(untilDestroyed(this))
      .subscribe(currenDayOnWeek =>{
      this.currenDayOnWeek = currenDayOnWeek;
    })
  }

  ngDoCheck() {
    this.route.firstChild?.data
      .pipe(untilDestroyed(this))
      .subscribe(( data: any ) => {
      this.activePath = data!.title;
    });
  }

  changeMonth(step: number) {
    this.calendarService.changeMonth(step);
  }

  changeWeek(step: number) {

    if ( this.currenDayOnWeek <= 0 && step < 0 ) {
      this.calendarService.currenDayOnWeek = this.staticDoubleArray.length -1;
      this.changeMonth(step);

    } else if( this.currenDayOnWeek >= this.staticDoubleArray.length -1  && step >  0 ) {
      this.calendarService.currenDayOnWeek = 0;
      this.changeMonth(step);

    } else {
      this.calendarService.currenDayOnWeek = this.currenDayOnWeek + step;
    }

  }

  findIndexInDoubleArray(): any {

    if( this.data[0][0].date.day < this.currentDay && this.currentDay < this.data[0][6].date.day ) {
      return this.calendarService.currenDayOnWeek = 0
    } else if( this.data[1][0].date.day < this.currentDay && this.currentDay < this.data[1][6].date.day ) {
      return this.calendarService.currenDayOnWeek = 1
    } else if( this.data[2][0].date.day < this.currentDay && this.currentDay < this.data[2][6].date.day ) {
      return this.calendarService.currenDayOnWeek = 2
    } else if( this.data[3][0].date.day < this.currentDay && this.currentDay < this.data[3][6].date.day ) {
      return this.calendarService.currenDayOnWeek = 3
    } else if( this.data[4][0].date.day < this.currentDay ) {
      return this.calendarService.currenDayOnWeek = 4
    }

  }

  generateWeekDaysArray () {
    const arr: any[] = [];

    for ( let i = 0; i < this.data.length; i++ ) {
      if( i == 0 ) {
        arr.push(`0${this.data[0][0].date.day} - 0${ this.data[0][6].date.day }`);

      } else if ( i == 1 ) {
        arr.push(`0${this.data[1][0].date.day} - ${ this.data[1][6].date.day }`);

      } else if ( i == 2 ) {
        arr.push(`${this.data[2][0].date.day} - ${ this.data[2][6].date.day }`);

      } else if ( i == 3 ) {
        arr.push(`${this.data[3][0].date.day} - ${ this.data[3][6].date.day }`);

      } else if ( i == 4 ) {

        if (this.data[4][this.data[4].length - 1].date.day > 28) {
          arr.push(`${this.data[4][0].date.day} - ${this.data[4][this.data[4].length - 1].date.day}`)
        } else {
          arr.push(`${this.data[4][0].date.day}`)
        }

      }
    }
    this.staticDoubleArray = arr ;
  }

}

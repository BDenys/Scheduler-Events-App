import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CalendarService } from '../../services/calendar.service';
import { Observable } from 'rxjs';

@UntilDestroy()
@Component( {
  selector: 'app-calendar-layouts',
  templateUrl: './calendar-layouts.component.html',
  styleUrls: [ './calendar-layouts.component.scss' ]
} )

export class CalendarLayoutsComponent implements OnInit, DoCheck {
  public staticDoubleArray: any[] = [];
  sortPrepareDate!: any[][];

  public activePath!: string;
  public currentYear$!: Observable<string>;
  public currentMonth$!: Observable<string>;
  calendar!: any[];

  currentDay!: number;
  currenDayOnWeek!: number;

  constructor(
    private route: ActivatedRoute,
    private calendarService: CalendarService
  ) {
  }

  ngOnInit(): void {

    this.calendarService.generateCalendar();
    this.currentMonth$ = this.calendarService.currenMonthString;
    this.currentYear$ = this.calendarService.currenYearString;

    this.calendarService.currenDay
      .pipe( untilDestroyed( this ) )
      .subscribe( currentDay => {
        this.currentDay = currentDay;
      } );

    // this.calendar = this.calendarService.prepareDataToWeekLayout();
    this.calendarService.sortPrepareDate
      .pipe( untilDestroyed( this ) )
      .subscribe( data => {
        this.calendar = data;
      } );

    this.calendarService.currenDayOnWeek
      .pipe( untilDestroyed( this ) )
      .subscribe( currenDayOnWeek => {
        this.currenDayOnWeek = currenDayOnWeek;
      } );

    this.generateWeekDaysArray();
    this.findIndexInDoubleArray();
  }

  ngDoCheck() {
    this.route.firstChild?.data
      .pipe( untilDestroyed( this ) )
      .subscribe( (data: any) => {
        this.activePath = data!.title;
      } );
    this.generateWeekDaysArray();
  }

  changeMonth(step: number) {
    this.calendarService.changeMonth( step );
  }

  changeWeek(step: number) {

    if ( this.currenDayOnWeek <= 0 && step < 0 ) {
      this.calendarService.currenDayOnWeek = this.staticDoubleArray.length - 1;
      this.changeMonth( step );

    } else if ( this.currenDayOnWeek >= this.staticDoubleArray.length - 1 && step > 0 ) {
      this.calendarService.currenDayOnWeek = 0;
      this.changeMonth( step );

    } else {
      this.calendarService.currenDayOnWeek = this.currenDayOnWeek + step;
    }

  }

  generateWeekDaysArray() {
    const arr: any[] = [];
    // console.log( this.calendar );
    for ( let i = 0; i < this.calendar.length; i++ ) {
      if ( i == 0 ) {
        arr.push( `0${ this.calendar[0][0].date.day } - 0${ this.calendar[0][6].date.day }` );

      } else if ( i == 1 ) {
        arr.push( `0${ this.calendar[1][0].date.day } - ${ this.calendar[1][6].date.day }` );

      } else if ( i == 2 ) {
        arr.push( `${ this.calendar[2][0].date.day } - ${ this.calendar[2][6].date.day }` );

      } else if ( i == 3 ) {
        arr.push( `${ this.calendar[3][0].date.day } - ${ this.calendar[3][6].date.day }` );

      } else if ( i == 4 ) {

        if ( this.calendar[4][this.calendar[4].length - 1].date.day > 28 ) {
          arr.push( `${ this.calendar[4][0].date.day } - ${ this.calendar[4][this.calendar[4].length - 1].date.day }` );
        } else {
          arr.push( `${ this.calendar[4][0].date.day }` );
        }

      }
    }
    // console.log( arr );
    this.staticDoubleArray = arr;
  }

  findIndexInDoubleArray(): any {

    if ( this.calendar[0][0].date.day <= this.currentDay && this.currentDay <= this.calendar[0][6].date.day ) {
      this.calendarService.currenDayOnWeek = 0;

    } else if ( this.calendar[1][0].date.day <= this.currentDay && this.currentDay <= this.calendar[1][6].date.day ) {
      this.calendarService.currenDayOnWeek = 1;

    } else if ( this.calendar[2][0].date.day <= this.currentDay && this.currentDay <= this.calendar[2][6].date.day ) {
      this.calendarService.currenDayOnWeek = 2;

    } else if ( this.calendar[3][0].date.day <= this.currentDay && this.currentDay <= this.calendar[3][6].date.day ) {
      this.calendarService.currenDayOnWeek = 3;

    } else if ( this.calendar[4][0].date.day <= this.currentDay ) {
      this.calendarService.currenDayOnWeek = 4;
    }

  }

}

import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CalendarService } from '../../services/calendar.service';

@UntilDestroy()
@Component( {
  selector: 'app-week-layouts',
  templateUrl: './week-layouts.component.html',
  styleUrls: [ './week-layouts.component.scss' ]
} )
export class WeekLayoutsComponent implements OnInit {

  public rows = Array( 7 ).fill( '' ).map( (day, index) => index );
  public columns = Array( 15 ).fill( '' ).map( (day, index) => index );

  staticDaysOfWeek!: string[][];
  calendar!: any[];
  currentDay!: number;
  public events: any[] = [];
  public durationHandler = 30;
  currenDayOnWeek!: number;
  daysInCurrentWeek!: number;
  daysInCurrentMonth!: number;
  sortedCalendar!: any[];
  selectedDay = {
    x: 0,
    y: 0
  };

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit(): void {

    this.calendarService.currenDay
      .pipe( untilDestroyed( this ) )
      .subscribe( currentDay => {
        this.currentDay = currentDay;
      } );



    // console.log( this.currenDayOnWeek );

    this.calendarService.currenDayOnWeek
      .pipe( untilDestroyed( this ) )
      .subscribe( currenDayOnWeek => {
        console.log(currenDayOnWeek);
        this.currenDayOnWeek = currenDayOnWeek;
      } );

    this.calendarService.daysInCurrentMonth
      .pipe( untilDestroyed( this ) )
      .subscribe( daysInCurrentMonth => {
        this.daysInCurrentMonth = daysInCurrentMonth;
      } );

    this.calendar = this.calendarService.prepareDataToWeekLayout();
    console.log( this.calendar[this.currenDayOnWeek][0].events );

    this.calendarService.sortedCalendar
      .pipe(untilDestroyed(this))
      .subscribe(sortCalendar => {
        this.sortedCalendar = sortCalendar;
        this.staticDaysOfWeek = this.generateDaysForWeek();
      });

  }

  selectedDayFunc(row: number, columns: number): void {
    this.selectedDay.x = row;
    this.selectedDay.y = columns;
    this.createEvent();
  }

  createEvent(coordinates?: any) {
    console.log(this.selectedDay);
    const newEvent = {
      x: this.selectedDay.x,
      y: this.selectedDay.y,
      duration: this.durationHandler,
      description: 'New Event'
    };

    this.events = [ ...this.events, newEvent ];
  }

  generateDaysForWeek() {

    const arraySize = 7;

    if ( this.sortedCalendar ) {
      return this.sortedCalendar.reduce( (acc, currenElement) => {
        if ( acc[acc.length - 1].length == arraySize ) {
          acc.push( [] );
        }

        if ( !currenElement.padding ) {
          acc[acc.length - 1].push( currenElement.date.day );
        }

        return acc;
      }, [[]] );
    }
  }

}

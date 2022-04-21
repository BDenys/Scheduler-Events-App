import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component( {
  selector: 'app-day-layouts',
  templateUrl: './day-layouts.component.html',
  styleUrls: [ './day-layouts.component.scss' ]
} )
export class DayLayoutsComponent implements OnInit {
  public columns = Array( 16 ).fill( '' ).map( (day, index) => index );
  currentDay!: number;
  daysInCurrentMonth!: number;
  calendar!: any;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {

    this.calendarService.currenDay
      .pipe( untilDestroyed( this ) )
      .subscribe( (currentDay: number) => {
        this.currentDay = currentDay;
      } );

    this.calendarService.daysInCurrentMonth
      .pipe( untilDestroyed( this ) )
      .subscribe( (daysInCurrenMonth: number) => {
        this.daysInCurrentMonth = daysInCurrenMonth;
      } );

    this.calendarService.sortedCalendar.subscribe(data => {
      this.calendar = data
    })

  }

  events = [
    {
      x: 0,
      y: 0,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 1,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 2,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 3,
      'duration': 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 4,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 5,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 6,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 7,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 8,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 9,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 10,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 11,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 12,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 13,
      duration: 30,
      description: 'New Event'
    },
    {
      x: 0,
      y: 14,
      duration: 30,
      description: 'New Event'
    }
  ];

  changeDay(step: number): void {
    const firstDayInMonth = 1;
    if ( firstDayInMonth === this.currentDay && step < 0 ) {
      this.calendarService.currenDay = this.daysInCurrentMonth;
      this.calendarService.changeMonth( step );

    } else if ( this.currentDay >= this.daysInCurrentMonth && step > 0 ) {
      this.calendarService.currenDay = firstDayInMonth;
      this.calendarService.changeMonth( step );

    } else {
      this.calendarService.currenDay = this.currentDay + step;
    }

  }

}

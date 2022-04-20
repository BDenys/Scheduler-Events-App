import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable( {
  providedIn: 'root'
} )
export class CalendarService {

  currentDay = new Date()

  private _calendar$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>( [] );

  staticWeekDays = [ 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье' ];
  staticWeekDaysShort = [ 'Пн', 'Вт', 'Ср', 'Чт', 'Пн', 'Сб', 'Вс' ];
  locales = 'ru-RU';

  navigation: number = 0;
  private _sortedCalendar: BehaviorSubject<any[]>  = new BehaviorSubject<any[]>( []);
  public _currenMonthString: BehaviorSubject<string> = new BehaviorSubject<string>( '' );
  public _currenYearString: BehaviorSubject<string> = new BehaviorSubject<string>( '' );
  public _currenWeek: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );
  public _currenDayOnWeek: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );
  public _currentDay: BehaviorSubject<number> = new BehaviorSubject<number>( 0  );
  public _daysInCurrentMonth: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );
  private _sortPrepareDate: BehaviorSubject<any[][]> = new BehaviorSubject<any[][]>( [[]]);

  // @ts-ignore
  get sortedCalendar(): Observable<any[]> {
    return this._sortedCalendar.asObservable();
  }

  set sortedCalendar(value: any[]) {
    this._sortedCalendar.next(value);
  }

  get sortPrepareDate(): Observable<any[][]> {
    return this._sortPrepareDate.asObservable();
  }

  set sortPrepareDate(value: any) {
    this._sortPrepareDate.next(value);
  }

  get calendar$(): Observable<any[]> {
    return this._calendar$.asObservable();
  }

  set calendar$(value: any) {
    this._calendar$.next( value );
  }

  get currenMonthString(): Observable<string> {
    return this._currenMonthString.asObservable();
  }

  set currenMonthString(value: any) {
    this._currenMonthString.next( value );
  }

  get currenYearString(): Observable<string> {
    return this._currenYearString.asObservable();
  }

  set currenYearString(value: any) {
    this._currenYearString.next( value );
  }

  get currenDay(): Observable<number> {
    return this._currentDay.asObservable();
  }

  set currenDay(value: any) {
    this._currentDay.next( value );
  }

  get currenDayOnWeek(): Observable<number> {
    return this._currenDayOnWeek.asObservable();
  }

  set currenDayOnWeek(value: any) {
    this._currenDayOnWeek.next( value );
  }

  get daysInCurrentMonth(): Observable<number> {
    return this._daysInCurrentMonth.asObservable();
  }

  set daysInCurrentMonth(value: any) {
    this._daysInCurrentMonth.next( value );
  }

  constructor() {
  }

  generateCalendar() {
    const date: Date = new Date();
    const day: number = date.getDate();

    if ( this.navigation !== 0 ) {
      date.setMonth( new Date().getMonth() + this.navigation );

      if ( this.navigation < 0) {
        this.currenDay = this._daysInCurrentMonth.value;
      } else if( this.navigation > 0 ) {
        this.currenDay = 1;
      } else {
        this.currenDay = date;
      }

    }
    const year: number = date.getFullYear();
    const month: number = date.getMonth();

    this.monthToLocaleDateString( date );
    this.yearToLocaleDateString( date );

    const daysInCurrentMonth = new Date( year, month + 1, 0 ).getDate();
    this.daysInCurrentMonth = daysInCurrentMonth;
    const firstDayInCurrentMonth = new Date( year, month, 1 );
    const dateToString = firstDayInCurrentMonth.toLocaleDateString( this.locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    } );
    const paddingDaysInCurrentMonth = this.staticWeekDays.indexOf( dateToString.split( ', ' )[0] );
    let calendar: any[] = [];

    const sum = +paddingDaysInCurrentMonth + +daysInCurrentMonth;

    for ( let i = 1; i <= sum; i++ ) {

      if ( i > +paddingDaysInCurrentMonth ) {
        const newEvent = {
          padding: false,
          current: (i - paddingDaysInCurrentMonth) === day,
          active: false,
          value: i - Number( paddingDaysInCurrentMonth ),
          date: {
            day: i - Number( paddingDaysInCurrentMonth ),
            dayInWeek: new Date( year, month, i - Number( paddingDaysInCurrentMonth ) ).toLocaleDateString( this.locales, {
              weekday: 'long'
            } ),
            dayInWeekShort: new Date( year, month, i - Number( paddingDaysInCurrentMonth ) ).toLocaleDateString( this.locales, {
              weekday: 'short'
            } ),
            month: new Date( year, month, i - Number( paddingDaysInCurrentMonth ) ).getMonth(),
            dateLong: new Date( year, month, i - Number( paddingDaysInCurrentMonth ) ).toLocaleDateString( this.locales, {
              weekday: 'long',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            } )
          },
          events: [
            { s: 's' },
            { s: 's' }
          ]
        };
        calendar.push( newEvent );

      } else {
        const newEvent = {
          padding: true,
          current: false,
          active: false,
          value: null,
          date: {
            day: i - paddingDaysInCurrentMonth,
            dayInWeek: new Date( year, month, i - paddingDaysInCurrentMonth ),
            dayInWeekShort: new Date( year, month, i - paddingDaysInCurrentMonth ).toLocaleDateString( this.locales, {
              weekday: 'short'
            } ),
            month: new Date( year, month, i - paddingDaysInCurrentMonth ).getMonth(),
            dateLong: new Date( year, month, i - paddingDaysInCurrentMonth ).toLocaleDateString( this.locales, {
              weekday: 'short',
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            } )
          },
          events: []
        };
        calendar.push( newEvent );
      }

    }

    this.sortedCalendar = this.sortData( calendar );
    this.calendar$ = calendar;
    this.sortPrepareDate = this.prepareDataToWeekLayout();
  }

  changeMonth(step: number): void {
    this.navigation = this.navigation + step;
    this.generateCalendar();
    this.sortPrepareDate = this.prepareDataToWeekLayout();
  }

  monthToLocaleDateString(date: Date): void {
    this.currenMonthString = date.toLocaleDateString( this.locales, { month: 'long' } );
  }

  yearToLocaleDateString(date: Date): void {
    this.currenYearString = date.toLocaleDateString( this.locales, { year: 'numeric' } );
  }

  prepareDataToWeekLayout(): any[][] {
    const SIZE = 7;
    return this.sortData( this._calendar$.value ).reduce( (acc, currenElement) => {
      if ( acc[acc.length - 1].length == SIZE ) {
        acc.push( [] );
      }

      if ( !currenElement.padding ) {
        acc[acc.length - 1].push( currenElement );
      }

      return acc;
    }, [ [] ] );
  }

  sortData(calendar: any[]): any[] {
    return calendar.sort( (dayA, dayB) => {
      return +dayA.date.day - +dayB.date.day;
    } );
  }
}

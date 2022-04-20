import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private _calendar$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  staticWeekDays = ['понедельник','вторник','среда','четверг','пятница','суббота','воскресенье'];
  staticWeekDaysShort = ['Пн','Вт','Ср','Чт','Пн','Сб','Вс'];
  locales = 'ru-RU'

  navigation: number = 0;
  private sortedCalendar: any[] = [];
  public _currenMonthString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public _currenYearString: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public _currenWeek: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public _currenDayOnWeek: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public _currentDay: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  get calendar$(): Observable<any[]> {
    return this._calendar$.asObservable();
  }

  set calendar$(value: any) {
    this._calendar$.next(value);
  }

  get currenMonthString(): Observable<string> {
    return this._currenMonthString.asObservable();
  }

  set currenMonthString(value: any) {
    this._currenMonthString.next(value);
  }

  get currenYearString(): Observable<string> {
    return this._currenYearString.asObservable();
  }

  set currenYearString(value: any) {
    this._currenYearString.next(value);
  }

  get currenDay(): Observable<number> {
    return this._currentDay.asObservable();
  }

  set currenDay(value: any) {
    this._currentDay.next(value);
  }

  get currenDayOnWeek(): Observable<number> {
    return this._currenDayOnWeek.asObservable();
  }

  set currenDayOnWeek(value: any) {
    this._currenDayOnWeek.next(value);
  }

  constructor() { }

  generateCalendar() {
    const date: Date = new Date();
    if ( this.navigation !== 0 ) {
      date.setMonth(new Date().getMonth() + this.navigation);
    }
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();

    this.currenDay = day;
    this.monthToLocaleDateString(date);
    this.yearToLocaleDateString(date);

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const firstDayInCurrentMonth = new Date( year, month,  1);
    const dateToString = firstDayInCurrentMonth.toLocaleDateString(this.locales, {
      weekday: 'long',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
    const paddingDaysInCurrentMonth = this.staticWeekDays.indexOf(dateToString.split(', ')[0]);
    let calendar: any[] = [];

    const sum = +paddingDaysInCurrentMonth + +daysInCurrentMonth;

    for (let i = 1; i <= sum; i++) {

      if ( i > +paddingDaysInCurrentMonth) {
        const newEvent = {
          padding: false,
          current: ( i - paddingDaysInCurrentMonth ) === day,
          active : false,
          value: i - Number(paddingDaysInCurrentMonth),
          date: {
            day:  i - Number(paddingDaysInCurrentMonth),
            dayInWeek: new Date( year, month, i - Number(paddingDaysInCurrentMonth)).toLocaleDateString(this.locales, {
              weekday: "long"
            }),
            dayInWeekShort: new Date( year, month, i - Number(paddingDaysInCurrentMonth)).toLocaleDateString(this.locales, {
              weekday: "short"
            }),
            month: new Date(year, month, i - Number(paddingDaysInCurrentMonth)).getMonth(),
            dateLong: new Date( year, month, i - Number(paddingDaysInCurrentMonth)).toLocaleDateString(this.locales, {
              weekday: "long",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }),
          },
          events:[
            { s: 's'},
            { s: 's'},
          ]
        }
        calendar.push(newEvent);

      } else {
        const newEvent = {
          padding: true,
          current: false,
          active : false,
          value: null,
          date: {
            day: i - paddingDaysInCurrentMonth,
            dayInWeek: new Date( year, month, i - paddingDaysInCurrentMonth),
            dayInWeekShort: new Date( year, month, i - paddingDaysInCurrentMonth).toLocaleDateString(this.locales, {
              weekday: "short"
            }),
            month: new Date(year, month, i - paddingDaysInCurrentMonth).getMonth(),
            dateLong: new Date( year, month, i - paddingDaysInCurrentMonth).toLocaleDateString(this.locales, {
              weekday: "short",
              year: "numeric",
              month: "numeric",
              day: "numeric",
            }),
          },
          events : []
        }
        calendar.push(newEvent);
      }

    }
    this.sortedCalendar = this.sortData(calendar);
    this.calendar$ = calendar;
  }

  changeMonth(step: number): void {
      this.navigation = this.navigation + step;
      this.generateCalendar();
  }

  monthToLocaleDateString(date: Date): void {
    this.currenMonthString = date.toLocaleDateString(this.locales, { month: "long" })
  }

  yearToLocaleDateString(date: Date): void {
    this.currenYearString = date.toLocaleDateString(this.locales, { year: "numeric" })
  }

  prepareDataToWeekLayout(): any[][] {
    const SIZE = 7;
    return this.sortData(this._calendar$.value).reduce((acc,currenElement)=>{
      if(acc[acc.length-1].length == SIZE){
        acc.push([]);
      }

      if ( !currenElement.padding) {
        acc[acc.length-1].push(currenElement);
      }
      return acc;
    }, [[]]);
  }

  sortData(calendar: any[]): any[] {
    return calendar.sort((dayA, dayB) => {
        return +dayA.date.day - +dayB.date.day
    })
  }



}

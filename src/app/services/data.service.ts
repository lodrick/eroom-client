import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  bigChart(){
    return [{
      name: 'Users',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
  }, {
      name: 'Registered',
      data: [106, 107, 111, 133, 221, 767, 1766]
  }, {
      name: 'Active users',
      data: [163, 203, 276, 408, 547, 729, 628]
  }, {
      name: 'Progression',
      data: [18, 31, 54, 156, 339, 818, 1201]
  }]
  }

  pieChart() {
    return [
      {
        name: 'Users',
        y: 61.41,
        sliced: true,
        selected: true,
      },
      {
        name: 'Registered',
        y: 11.84,
      },
      {
        name: 'Active users',
        y: 10.85,
      },
      {
        name: 'Progression',
        y: 4.67,
      },
      
    ];
  }
}

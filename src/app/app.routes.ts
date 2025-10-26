import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'bar-chart',
    loadComponent: () =>
      import('./components/bar-chart/bar-chart.component').then(
        (m) => m.BarChartComponent
      ),
  },
  {
    path: 'line-chart',
    loadComponent: () =>
      import(
        './components/line-chart-with-bar-chart/line-chart-with-bar-chart.component'
      ).then((m) => m.LineChartWithBarChartComponent),
  },
];

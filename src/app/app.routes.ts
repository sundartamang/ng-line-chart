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
        './components/bar-graph-sticky-yaxis/bar-graph-sticky-yaxis.component'
      ).then((m) => m.BarGraphStickyYAxisComponent),
  },
  {
    path: 'horizontal-bar-chart',
    loadComponent: () =>
      import(
        './components/horixontal-bar-graph/horixontal-bar-graph.component'
      ).then((m) => m.HorixontalBarGraphComponent),
  },
  {
    path: 'bar-chart-with-line-chart',
    loadComponent: () =>
      import(
        './components/bar-graph-with-line-chart/bar-graph-with-line-chart.component'
      ).then((m) => m.BarGraphWithLineChartComponent),
  },
];

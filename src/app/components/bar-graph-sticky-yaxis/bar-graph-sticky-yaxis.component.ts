import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SALE_DATA } from './data';

@Component({
  selector: 'app-bar-graph-sticky-yaxis',
  standalone: true,
  imports: [],
  templateUrl: './bar-graph-sticky-yaxis.component.html',
  styleUrl: './bar-graph-sticky-yaxis.component.scss',
})
export class BarGraphStickyYAxisComponent {
  myChart!: Chart;
  chartData: any;

  @ViewChild('box', { static: false })
  box!: ElementRef<HTMLDivElement>;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.chartData = this.extractChartData();
  }

  ngAfterViewInit(): void {
    this.initializeChartJsOne();
    this.initializeChartJsTwo();
    this.adjustChartContainerWidth();
  }

  private initializeChartJsOne(): void {
    const { labels, values } = this.chartData;

    const data = {
      labels,
      datasets: [
        {
          label: 'Weekly Sales',
          data: values,
          backgroundColor: ['rgba(153, 102, 255, 1)'],
          borderColor: ['rgba(153, 102, 255, 1)'],
          borderWidth: 1,
          barThickness: 55,
        },
      ],
    };

    const config = {
      type: 'bar' as const,
      data,
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 10,
          },
        },
        scales: {
          x: {
            stacked: false,
            ticks: {
              padding: 10,
              callback: function (value: any, index: any) {
                const fullLabel = labels[index] as string;
                return fullLabel.length > 7
                  ? fullLabel.substring(0, 7) + '…'
                  : fullLabel;
              },
              maxRotation: 0,
              minRotation: 0,
            },
            grid: { display: false },
            offset: true,
          },
          y: {
            beginAtZero: true,
            ticks: { display: false },
            grid: { drawTicks: false, drawBorder: false },
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (tooltipItem: any) {
                // Full label shown on hover
                const label = tooltipItem.dataset.label || '';
                return `${label}: ${tooltipItem.raw}`;
              },
            },
          },
          beforeDraw: (chart: any) => {
            chart.scales['y']?.draw(chart.ctx);
          },
        },
      },
    };

    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, config);
  }

  private initializeChartJsTwo(): void {
    const { labels, values } = this.chartData;

    const data = {
      labels,
      datasets: [
        {
          label: 'Weekly Sales',
          data: values,
          backgroundColor: ['rgba(54, 162, 235, 0.6)'],
          borderColor: ['rgba(54, 162, 235, 1)'],
          borderWidth: 1,
          barThickness: 55,
        },
      ],
    };

    const config = {
      type: 'bar' as const,
      data,
      options: {
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 42.5,
          },
        },
        scales: {
          x: {
            stacked: false,
            ticks: { display: false },
            grid: { drawTicks: false },
            offset: true,
          },
          y: {
            beginAtZero: true,
            afterFit: (ctx: any) => {
              ctx.width = 35;
            },
            align: 'end',
          },
        },
        plugins: {
          legend: { display: false },
        },
      },
    };

    const ctx = document.getElementById('myChartTwo') as HTMLCanvasElement;
    this.myChart = new Chart(ctx, config);
  }

  private extractChartData() {
    const labels = SALE_DATA.map((item: any) => item.day);
    const values = SALE_DATA.map((item: any) => item.sales);
    return { labels, values };
  }

  private adjustChartContainerWidth(): void {
    const box = this.box.nativeElement;
    const barLength = this.chartData.labels.length;
    const boxWidth = box.offsetWidth;
    const calculatedWidth = barLength * 75;
    box.style.width =
      boxWidth < calculatedWidth ? `${calculatedWidth}px` : '100%';
  }
}

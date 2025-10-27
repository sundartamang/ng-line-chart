import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RAW_BAR_DATA } from './data';

@Component({
  selector: 'app-bar-graph-with-line-chart',
  standalone: true,
  templateUrl: './bar-graph-with-line-chart.component.html',
  styleUrls: ['./bar-graph-with-line-chart.component.scss'],
})
export class BarGraphWithLineChartComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart: Chart | undefined;
  barChartData: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.replaceNumberByMaxValue();
  }

  ngAfterViewInit(): void {
    this.initializeChartJs();
  }

  private initializeChartJs(): void {
    const labels = RAW_BAR_DATA.map((item: any) => item.color);
    const dataValues = RAW_BAR_DATA.map((item: any) => item.votes);

    // Example line data: e.g., cumulative or average
    const lineData = dataValues.map((_, i) =>
      Math.round(
        dataValues.slice(0, i + 1).reduce((a, b) => a + b, 0) / (i + 1)
      )
    );

    const barWidth = 100;
    const totalChartWidth = labels.length * (barWidth + 10);
    const containerWidth =
      this.canvasRef.nativeElement.parentElement!.offsetWidth;
    const canvasWidth = Math.max(totalChartWidth, containerWidth);

    this.canvasRef.nativeElement.width = canvasWidth;
    this.canvasRef.nativeElement.height = 550;

    const maxValue = Math.max(...RAW_BAR_DATA.map((item: any) => item.votes));

    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            type: 'bar',
            label: 'Votes',
            data: this.barChartData,
            backgroundColor: 'rgba(180, 180, 180, 0.09)',
            hoverBackgroundColor: 'rgba(180, 180, 180, 0.09)',
            borderWidth: 0,
            yAxisID: 'y',
            order: 2,
            // barThickness: barWidth,
            maxBarThickness: barWidth,
            barPercentage: 1,
            categoryPercentage: 1,
          },
          {
            type: 'line',
            label: 'Average',
            data: lineData,
            borderColor: '#f97316',
            backgroundColor: 'rgba(249, 115, 22, 0.2)',
            fill: false,
            tension: 0.3,
            pointRadius: 4,
            pointBackgroundColor: '#f97316',
            yAxisID: 'y',
            order: 1,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            filter: (tooltipItem) => tooltipItem.dataset.type !== 'bar',
          },
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { padding: 10 },
            offset: true,
          },
          y: {
            beginAtZero: true,
            max: maxValue,
            grid: { color: '#e5e7eb' },
          },
        },
      },
    });
  }

  private replaceNumberByMaxValue() {
    if (!RAW_BAR_DATA || RAW_BAR_DATA.length === 0) {
      throw new Error('RAW_BAR_DATA is empty or undefined.');
    }
    const maxValue = Math.max(...RAW_BAR_DATA.map((item: any) => item.votes));
    console.log('Max Value:', maxValue);

    // Replace all votes with the max value
    this.barChartData = RAW_BAR_DATA.map(() => maxValue);

    // Alternate between 0 and maxValue
    this.barChartData = RAW_BAR_DATA.map((_, index) =>
      index % 2 === 0 ? 0 : maxValue
    );
  }
}

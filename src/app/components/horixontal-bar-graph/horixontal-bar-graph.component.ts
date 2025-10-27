import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RAW_BAR_DATA } from './data';

@Component({
  selector: 'app-horixontal-bar-graph',
  standalone: true,
  imports: [],
  templateUrl: './horixontal-bar-graph.component.html',
  styleUrls: ['./horixontal-bar-graph.component.scss'],
})
export class HorixontalBarGraphComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initializeChartJs();
  }

  private initializeChartJs(): void {
    const labels = RAW_BAR_DATA.map((item) => item.color);
    const dataValues = RAW_BAR_DATA.map((item) => item.votes);

    const barHeight = 40; // height of each horizontal bar
    const totalChartHeight = labels.length * (barHeight + 10); // bar + spacing

    const containerHeight =
      this.canvasRef.nativeElement.parentElement!.offsetHeight || 550;

    // Canvas height: either container or total chart height
    const canvasHeight = Math.max(totalChartHeight, containerHeight);

    this.canvasRef.nativeElement.width =
      this.canvasRef.nativeElement.parentElement!.offsetWidth;
    this.canvasRef.nativeElement.height = canvasHeight;

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#60a5fa'],
          barThickness: barHeight,

          drawBorder: false,
          color: '#e5e5e5',
        },
      ],
    };

    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: chartData,
      options: {
        indexAxis: 'y' as const,
        responsive: false,
        animation: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            ticks: { padding: 10 },
            grid: { display: false },
          },
        },
      },
    });
  }
}

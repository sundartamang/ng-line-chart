import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { RAW_BAR_DATA } from './data';
import { max } from 'rxjs';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  chart: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeChartJs();
  }

  private initializeChartJs(): void {
    const labels = RAW_BAR_DATA.map((item: any) => item.color);
    const dataValues = RAW_BAR_DATA.map((item: any) => item.votes);

    const barWidth = 90; // fixed bar width
    const totalChartWidth = labels.length * (barWidth + 10); // bar + spacing

    const containerWidth =
      this.canvasRef.nativeElement.parentElement!.offsetWidth;

    // Canvas width: either container or total chart width
    const canvasWidth = Math.max(totalChartWidth, containerWidth);

    this.canvasRef.nativeElement.width = canvasWidth;
    this.canvasRef.nativeElement.height = 550;

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: dataValues,
          backgroundColor: ['#60a5fa'],
          barThickness: barWidth,
        },
      ],
    };

    this.chart = new Chart(this.canvasRef.nativeElement, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: false,
        animation: false,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            stacked: false,
            ticks: { padding: 10 },
            grid: { display: false },
            offset: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

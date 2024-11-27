import { Component, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Participant } from '../../models/transcript.model';
import { ChartService } from '../../services/chart.service';

@Component({
  selector: 'app-engagement-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      height: 200px;
      margin: 20px 0;
      background: rgba(123, 104, 238, 0.1);
      border-radius: var(--border-radius);
      padding: 16px;
    }
  `]
})
export class EngagementChartComponent implements AfterViewInit {
  @Input() participants: Participant[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
  private chart?: Chart;

  constructor(private chartService: ChartService) {}

  ngAfterViewInit() {
    if (this.participants.length > 0) {
      this.createChart();
    }
  }

  private createChart() {
    const canvas = this.chartCanvas.nativeElement;
    this.chart = this.chartService.createEngagementChart(canvas, this.participants);
  }
}
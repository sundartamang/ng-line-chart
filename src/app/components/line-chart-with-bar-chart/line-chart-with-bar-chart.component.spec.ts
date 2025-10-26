import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartWithBarChartComponent } from './line-chart-with-bar-chart.component';

describe('LineChartWithBarChartComponent', () => {
  let component: LineChartWithBarChartComponent;
  let fixture: ComponentFixture<LineChartWithBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartWithBarChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineChartWithBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphWithLineChartComponent } from './bar-graph-with-line-chart.component';

describe('BarGraphWithLineChartComponent', () => {
  let component: BarGraphWithLineChartComponent;
  let fixture: ComponentFixture<BarGraphWithLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGraphWithLineChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarGraphWithLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

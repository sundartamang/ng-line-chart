import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarGraphStickyYAxisComponent } from './bar-graph-sticky-yaxis.component';

describe('BarGraphStickyYAxisComponent', () => {
  let component: BarGraphStickyYAxisComponent;
  let fixture: ComponentFixture<BarGraphStickyYAxisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarGraphStickyYAxisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarGraphStickyYAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

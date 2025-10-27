import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorixontalBarGraphComponent } from './horixontal-bar-graph.component';

describe('HorixontalBarGraphComponent', () => {
  let component: HorixontalBarGraphComponent;
  let fixture: ComponentFixture<HorixontalBarGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorixontalBarGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HorixontalBarGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

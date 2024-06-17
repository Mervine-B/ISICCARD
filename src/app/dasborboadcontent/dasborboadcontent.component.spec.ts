import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DasborboadcontentComponent } from './dasborboadcontent.component';

describe('DasborboadcontentComponent', () => {
  let component: DasborboadcontentComponent;
  let fixture: ComponentFixture<DasborboadcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DasborboadcontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DasborboadcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalescordinatorComponent } from './salescordinator.component';

describe('SalescordinatorComponent', () => {
  let component: SalescordinatorComponent;
  let fixture: ComponentFixture<SalescordinatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalescordinatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalescordinatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

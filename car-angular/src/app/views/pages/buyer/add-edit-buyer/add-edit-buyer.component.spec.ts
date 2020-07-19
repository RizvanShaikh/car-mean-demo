import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBuyerComponent } from './add-edit-buyer.component';

describe('AddEditBuyerComponent', () => {
  let component: AddEditBuyerComponent;
  let fixture: ComponentFixture<AddEditBuyerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditBuyerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

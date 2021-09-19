import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should update activePage on click', () => {
    component.onPageChange({ srcElement: { innerText: 7 } });

    expect(component.activePage).toEqual(7);
  });

  it('should emit event on pageChange', () => {
    spyOn(component.pageChange, 'emit');

    component.onPageChange({ srcElement: { innerText: 7 } });

    expect(component.pageChange.emit).toHaveBeenCalledWith(7);
  });
});

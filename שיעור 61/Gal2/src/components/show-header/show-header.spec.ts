import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowHeader } from './show-header';

describe('ShowHeader', () => {
  let component: ShowHeader;
  let fixture: ComponentFixture<ShowHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

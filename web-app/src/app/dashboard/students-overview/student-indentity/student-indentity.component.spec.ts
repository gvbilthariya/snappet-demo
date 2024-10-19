import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentIndentityComponent } from './student-indentity.component';

describe('StudentIndentityComponent', () => {
  let component: StudentIndentityComponent;
  let fixture: ComponentFixture<StudentIndentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentIndentityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudentIndentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

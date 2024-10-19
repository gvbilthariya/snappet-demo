import { Component, Input } from '@angular/core';
import { Student } from '../../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-indentity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-indentity.component.html',
  styleUrl: './student-indentity.component.scss'
})
export class StudentIndentityComponent {
  @Input() student!: Student
}

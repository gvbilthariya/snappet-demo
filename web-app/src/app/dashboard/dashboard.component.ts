import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { SubjectsOverviewComponent } from './subjects-overview/subjects-overview.component';
import { ObjectivesOverviewComponent } from './objectives-overview/objectives-overview.component';
import { StudentsOverviewComponent } from './students-overview/students-overview.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, SubjectsOverviewComponent, ObjectivesOverviewComponent, StudentsOverviewComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}

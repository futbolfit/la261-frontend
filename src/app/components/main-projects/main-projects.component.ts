import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import projects from './../../data/projects.json';
import { Project } from '../../data/models/project.model';

@Component({
  selector: 'app-main-projects',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './main-projects.component.html',
  styleUrl: './main-projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainProjectsComponent implements OnInit {
  @Input() page: string = '';
  projects: Project[] = [];

  ngOnInit(): void {
    this.projects = projects.map((pro) => Project.fromJson(pro));
  }


}

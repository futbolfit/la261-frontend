import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from "../../components/main-footer/main-footer.component";
import { MainProjectsComponent } from "../../components/main-projects/main-projects.component";

@Component({
  selector: 'app-main-landing',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    NavbarComponent,
    MainFooterComponent,
    MainProjectsComponent,
    MainProjectsComponent,
],
  templateUrl: './main-landing.component.html',
  styleUrl: './main-landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainLandingComponent { }

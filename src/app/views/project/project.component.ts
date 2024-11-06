import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from "../../components/main-footer/main-footer.component";
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Project } from '../../data/models/project.model';
import projects from './../../data/projects.json';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MainFooterComponent,
    YouTubePlayerModule,
    RouterModule
],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectComponent implements OnInit {
  project?: Project;

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const project_name = this.route.snapshot.paramMap.get('project_name');
    const project = projects.find((pro) => pro.project_name === project_name);
    if (!project) this.router.navigateByUrl('/');
    this.project = project;
  }

  @ViewChild('slider', { static: false }) sliderElement!: ElementRef;
  cont: number = 0;

  next() {
    if (
      this.carouselChildren[this.cont].getBoundingClientRect().x < 1 ||
      this.carouselChildren[this.cont].getBoundingClientRect().x > 1
    ) {
      if (this.cont !== this.carouselChildren.length - 1) {
        const wli = Number(
          getComputedStyle(this.carouselChildren[this.cont])
            .getPropertyValue('width')
            .split('px')[0]
        );

        this.cont = this.cont + 1;
        this.sliderElement.nativeElement.scrollLeft += wli;
      } else {
        this.cont = 0;
        this.sliderElement.nativeElement.scrollLeft = 0;
      }
    }
  }

  previous() {
    const lastWli = this.carouselChildren[this.carouselChildren.length - 1].getBoundingClientRect().x;

    if (
      this.carouselChildren[this.cont].getBoundingClientRect().x < 1 ||
      this.carouselChildren[this.cont].getBoundingClientRect().x > 1
    ) {
      if (this.cont !== 0) {

        const wli = Number(
          getComputedStyle(this.carouselChildren[this.cont - 1])
            .getPropertyValue('width')
            .split('px')[0]
        );

        this.sliderElement.nativeElement.scrollLeft -= wli;
        this.cont = this.cont - 1;
      } else {
        this.cont = this.carouselChildren.length - 1;
        this.sliderElement.nativeElement.scrollLeft = lastWli;
      }
    }
  }

  get carouselChildren () {
    return this.sliderElement.nativeElement.children[0].children;
  }


}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from "../../components/main-footer/main-footer.component";
import { YouTubePlayerModule } from '@angular/youtube-player';
import { Project } from '../../data/models/project.model';
import projects from './../../data/projects.json';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

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

  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    const project_name = this.route.snapshot.paramMap.get('project_name');
    const project_found = projects.find((pro) => pro.project_name === project_name);
    if (project_found) {
      const project = Project.fromJson(project_found);
      this.project = project;

      this.title.setTitle(project_found.project_title + ' - La261')
      this.meta.updateTag({ name: 'description', content: project_found.project_description})
      this.meta.updateTag({ name: 'og:title', content: project_found.project_title})
      this.meta.updateTag({ name: 'og:description', content: project_found.project_description})
      this.meta.updateTag({ name: 'og:image', content: 'https://la261.com/assets/images/Logo_Principal@4x.png'})
      this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
      this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
    } else {
      this.router.navigateByUrl('/')
    }
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
    console.log(this.sliderElement.nativeElement.children[0].children);
    return this.sliderElement.nativeElement.children[0].children;
  }


}

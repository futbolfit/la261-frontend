import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from '../../components/main-footer/main-footer.component';
import { MainProjectsComponent } from "../../components/main-projects/main-projects.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MainFooterComponent,
    MainProjectsComponent,
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Proyectos - La261')
    this.meta.updateTag({ name: 'description', content: 'Todos los proyectos de La261'})
    this.meta.updateTag({ name: 'og:title', content: 'Proyectos de La261'})
    this.meta.updateTag({ name: 'og:description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:image', content: 'https://la261.com/assets/images/Logo_Principal@4x.png'})
    this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
  }
}

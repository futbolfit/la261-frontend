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
    this.meta.updateTag({ name: 'og:image', content: 'https://scontent-lim1-1.cdninstagram.com/v/t51.2885-19/461524027_541820074899060_7519980841523071696_n.jpg?stp=dst-jpg_e0_s150x150&_nc_ht=scontent-lim1-1.cdninstagram.com&_nc_cat=100&_nc_ohc=N8Mmyzehz7cQ7kNvgEfTLhL&_nc_gid=095becfdbf8749eeb7e2e25dcf52ef26&edm=APoiHPcBAAAA&ccb=7-5&oh=00_AYClNEpNem1Ctv-w68AHDENTGZZ-l-XoU8HNqxcwI6J2uQ&oe=6742C56F&_nc_sid=22de04'})
    this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
  }
}

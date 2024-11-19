import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from "../../components/main-footer/main-footer.component";
import { MainProjectsComponent } from "../../components/main-projects/main-projects.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-landing',
  standalone: true,
  imports: [
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
export default class MainLandingComponent implements OnInit{
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('La261')
    this.meta.updateTag({ name: 'description', content: 'Bienvenido a La261'})
    this.meta.updateTag({ name: 'og:title', content: '¡Bienvenido a La261!'})
    this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
  }


}

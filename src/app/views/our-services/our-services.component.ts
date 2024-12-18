import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from '../../components/main-footer/main-footer.component';
import { MainProjectsComponent } from "../../components/main-projects/main-projects.component";
import { Meta, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-us',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    MainFooterComponent,
],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OurServicesComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle('Nuestros Servicios - La261')
    this.meta.updateTag({ name: 'description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:title', content: 'Somos la La261'})
    this.meta.updateTag({ name: 'og:description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:image', content: 'https://media.licdn.com/dms/image/v2/D4E0BAQHJsGZ7UByx6Q/company-logo_200_200/company-logo_200_200/0/1729301158422?e=1740009600&v=beta&t=KpQJF8ywfpdpIEWrkB2MBJfdmD8z9mSfnebU4HxOq14'})
    this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
  }

  sendWhatsapp() {
    const encodedMessage = encodeURIComponent('Quiero hablar con un asesor.');

    // Crear el enlace
    const whatsappUrl = `https://wa.me/${51993092037}?text=${encodedMessage}`;

    // Abrir el enlace en una nueva pestaña o redirigir
    window.open(whatsappUrl, '_blank');
  }
}

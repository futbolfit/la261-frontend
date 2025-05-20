import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from '../../components/main-footer/main-footer.component';
import { MainProjectsComponent } from "../../components/main-projects/main-projects.component";
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-us',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MainFooterComponent,
],
  templateUrl: './us.component.html',
  styleUrl: './us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UsComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);
  @ViewChild('scrollable') scrollable?: ElementRef;
  private platform = inject(PLATFORM_ID);
  public isFlipped = false;

  public whyChooseItems = [
    {
      id: '1',
      title: 'Calidad',
      description: 'Nuestro objetivo es entregar los mejores resultados y experiencias superando todas las expecativas.'
    },
    {
      id: '2',
      title: 'Compromiso <br> y empatía',
      description: 'Hacemos los proyectos de nuestros clientes como si fueran nuestros, con una escucha activa y colaborativa.'
    },
    {
      id: '3',
      title: 'Creatividad',
      description: 'Nuestra experiencia y conocimiento de diversos rubros, nos permite abordar los proyectos de forma innovadora.'
    },
    {
      id: '4',
      title: 'Atención al detalle',
      description: 'Contamos con una gran capacidad de gestión, organización y desarrollo de proyectos de forma minuciosa y precisa.'
    }
  ];

  public whyChooseFlipped: Record<string, any> = {};

  processChooseItem(event: Event) {
    const target = event.target as HTMLElement;
    const chooseItem = target.parentElement?.parentElement?.parentElement;
    if (chooseItem) {
      chooseItem.classList.add('is-flipped');
      setTimeout(() => {
        chooseItem.classList.remove('is-flipped');
      }, 7000);
    }
  }

  ngOnInit(): void {
    this.title.setTitle('Conócenos - La261')
    this.meta.updateTag({ name: 'description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:title', content: 'Somos la La261'})
    this.meta.updateTag({ name: 'og:description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:image', content: 'https://la261.com/assets/images/Logo_Principal@4x.png'})
    this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element && this.scrollable) {
      const scrollContainer = this.scrollable.nativeElement;
      const elementYPosition = element.offsetTop;
      const offset = 72;
      scrollContainer.scrollTo({ top: elementYPosition - offset, behavior: 'smooth' });
    }
  }
}

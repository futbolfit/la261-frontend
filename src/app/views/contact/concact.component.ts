import { CommonModule, isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from '../../components/main-footer/main-footer.component';
import { MainProjectsComponent } from "../../components/main-projects/main-projects.component";
import { Meta, Title } from '@angular/platform-browser';
import projects from './../../data/projects.json';
import { Project } from '../../data/models/project.model';
import { interval, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { isFieldRequired } from '../../utils/utils';
@Component({
  selector: 'app-us',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MainFooterComponent,
    ReactiveFormsModule,
],
  templateUrl: './concact.component.html',
  styleUrl: './concact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent implements OnInit, OnDestroy {
  @ViewChild('recoSlider', { static: false }) sliderElement!: ElementRef;
  cont: number = 0;
  private title = inject(Title);
  private meta = inject(Meta);
  private platform = inject(PLATFORM_ID)
  private destroy$ = new Subject<void>();
  private fb = inject(FormBuilder);

  public projects: Project[] = [];


  ngOnInit(): void {
    this.projects = projects.map((pro) => Project.fromJson(pro));

    this.title.setTitle('Contacto - La261')
    this.meta.updateTag({ name: 'description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:title', content: 'Somos la La261'})
    this.meta.updateTag({ name: 'og:description', content: 'Expertos en transformar objetivos en experiencias únicas a través de eventos diseñados con creatividad y precisión.'})
    this.meta.updateTag({ name: 'og:image', content: 'https://media.licdn.com/dms/image/v2/D4E0BAQHJsGZ7UByx6Q/company-logo_200_200/company-logo_200_200/0/1729301158422?e=1740009600&v=beta&t=KpQJF8ywfpdpIEWrkB2MBJfdmD8z9mSfnebU4HxOq14'})
    this.meta.updateTag({ name: 'keywords', content: '261,La261,Lorena,Beatriz,Eventos,Agencia,Marketing,Proyectos'})

    if (!isPlatformServer(this.platform)) {
      interval(6000)
      .pipe(takeUntil(this.destroy$)) // Detener el intervalo al destruir el componente
      .subscribe({
        next: (res) => {
          this.next();
        },
        error: (err) => console.error('Error en interval:', err),
        complete: () => console.log('Interval completado'),
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public contactForm: FormGroup = this.fb.group({
    names: ['', [Validators.required]],
    email: ['', [Validators.required]],
    company: ['', [Validators.required]],
    message: ['', [Validators.required]],
  })

  submitContactForm() {
    console.log(this.contactForm.value);
  }

  isFieldRequired(field: string | string []) {
    return isFieldRequired(field, this.contactForm);
  }

  isFieldValid(field: string) {
    return (
      this.contactForm.get(field)?.invalid &&
      this.contactForm.get(field)?.touched
    );
  }

  getConditionTemplate(condition: string, field: string = '') {
    switch (condition) {
      case 'input-border':
        if (this.isFieldValid(field)) {
          return '2px solid red';
        } else {
          return '1.3px solid black'
        }
        return '';
      default:
        return false;
    }
  }

  next() {
    if (
      this.carouselChildren[this.cont].getBoundingClientRect().x < 1 ||
      this.carouselChildren[this.cont].getBoundingClientRect().x > 1
    ) {
      const isNextMockUp: boolean = this.carouselChildren[this.cont + 1].children[0].children[0].innerHTML === ''
      if ((this.cont !== this.carouselChildren.length - 1) && !isNextMockUp) {
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
    return this.sliderElement.nativeElement.children[0].children[0].children;
  }
}

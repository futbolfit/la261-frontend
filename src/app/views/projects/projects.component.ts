import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MainFooterComponent } from "../../components/main-footer/main-footer.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    MainFooterComponent
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProjectsComponent {
  @ViewChild('slider', { static: false }) sliderElement!: ElementRef;
  cont: number = 0;

  next() {
    const wli = Number(
      getComputedStyle(this.carouselChildren[0])
        .getPropertyValue('width')
        .split('px')[0]
    );
    if (
      this.carouselChildren[this.cont].getBoundingClientRect().x < 1 ||
      this.carouselChildren[this.cont].getBoundingClientRect().x > 1
    ) {
      this.sliderElement.nativeElement.scrollLeft = wli * (this.cont + 1);

      if (this.cont !== this.carouselChildren.length - 1) {
        this.cont = this.cont + 1;
      } else {
        this.cont = 0;
        this.sliderElement.nativeElement.scrollLeft = 0;
      }
    }
  }

  previous() {
    const wli = Number(
      getComputedStyle(this.carouselChildren[0])
        .getPropertyValue('width')
        .split('px')[0]
    );
    if (
      this.carouselChildren[this.cont].getBoundingClientRect().x < 1 ||
      this.carouselChildren[this.cont].getBoundingClientRect().x > 1
    ) {
      console.log(wli);
      this.sliderElement.nativeElement.scrollLeft = wli * (this.cont - 1);

      if (this.cont !== 0) {
        this.cont = this.cont - 1;
      } else {
        this.cont = 3;
        this.sliderElement.nativeElement.scrollLeft = wli * this.carouselChildren.length;
      }
    }
  }

  get carouselChildren () {
    return this.sliderElement.nativeElement.children[0].children;
  }
}

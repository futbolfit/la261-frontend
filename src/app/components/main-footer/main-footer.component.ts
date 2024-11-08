import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFooterComponent {
  openInNewWindow(url: string) {
    window.open(url, '_blank');
  }
}

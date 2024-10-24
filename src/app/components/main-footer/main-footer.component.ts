import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-footer',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './main-footer.component.html',
  styleUrl: './main-footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainFooterComponent { }

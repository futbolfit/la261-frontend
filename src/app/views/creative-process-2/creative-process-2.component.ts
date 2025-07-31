import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-creative-process-2',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './creative-process-2.component.html',
  styleUrl: './creative-process-2.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreativeProcess2Component { }

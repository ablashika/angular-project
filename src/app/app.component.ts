import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayDataComponent } from './display-data/display-data.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DisplayDataComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-project';
}

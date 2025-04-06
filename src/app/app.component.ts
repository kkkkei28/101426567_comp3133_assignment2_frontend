import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ ADD THIS
  imports: [RouterOutlet], // ✅ ALREADY CORRECT
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // ✅ fix typo from `styleUrl` to `styleUrls`
})
export class AppComponent {
  title = 'frontend';
}

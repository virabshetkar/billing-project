import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  imports: [FaIconComponent],
  selector: 'app-loading',
  styleUrl: './loading.css',
  templateUrl: './loading.html',
})
export class Loading {
  icons = {
    faSpinner,
  } as const;
}

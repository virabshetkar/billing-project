import { Component } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-mobile',
  imports: [OverlayModule, RouterOutlet, Navbar],
  templateUrl: './mobile.layout.html',
  styleUrl: './mobile.layout.css',
})
export class MobileLayout {}

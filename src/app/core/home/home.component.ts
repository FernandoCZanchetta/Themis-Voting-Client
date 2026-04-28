import { Component } from '@angular/core'
import { SidebarService } from '@services'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public sidebarService: SidebarService) {}
}

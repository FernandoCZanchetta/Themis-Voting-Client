import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService, SidebarService } from '@services'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('navbar') navbarRef!: ElementRef

  constructor(
    private router: Router,
    private authService: AuthService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      // if a little bit of the page was scrolled
      // window.scrollY > 25 ? this.setSticky() : this.unsetSticky()
      if (window.scrollY > 25) {
        this.setSticky()
      } else {
        this.unsetSticky()
      }
    })
  }

  ngOnDestroy(): void {
    this.unsetSticky()
  }

  openSidebar(): void {
    this.sidebarService.open()
  }

  goToHomepage(): void {
    this.router.navigate(['/'])
  }

  logout(): void {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

  get isLogged() {
    return this.authService.isAuthenticated()
  }

  private setSticky() {
    const navbar = this.navbarRef?.nativeElement as Element
    const { height } = navbar.getBoundingClientRect()

    navbar.classList.add('fixed-top')

    const main = document.querySelector('main') || document.querySelector('.main')
    if (main) {
      main.style.paddingTop = `${height + 16}px`
    }

    document.querySelectorAll('a[id]').forEach(anchor => {
      anchor.setAttribute('style', `scroll-margin-top: ${height}px`)
    })
  }

  private unsetSticky() {
    const navbar = this.navbarRef?.nativeElement
    navbar.classList.remove('fixed-top')

    const main = document.querySelector('main') || document.querySelector('.main')
    if (main) {
      main.style.paddingTop = '16px'
    }
  }
}

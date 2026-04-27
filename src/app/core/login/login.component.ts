import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '@services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false
  error = ''

  form = new FormGroup({
    nUSP: new FormControl('', [Validators.required]),
    uniquePassword: new FormControl('', [Validators.required]),
  })

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  login() {
    if (this.form.invalid) {
      this.error = 'Preencha todos os campos!'
      return
    }

    this.loading = true
    this.error = ''

    const { nUSP, uniquePassword } = this.form.value

    this.authService.login(nUSP!, uniquePassword!).subscribe({
      next: () => {
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')

        this.router.navigateByUrl(returnUrl || '/votings')
      },

      error: () => {
        this.error = 'Falha no Login!'
        this.loading = false
      },

      complete: () => {
        this.loading = false
      },
    })
  }
}

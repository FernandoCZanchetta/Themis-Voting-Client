import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { LoginResponseModel } from '@models'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl
  private tokenKey = 'themis-voting-token'

  constructor(private http: HttpClient) {}

  login(nUSP: string, uniquePassword: string) {
    return this.http.post<LoginResponseModel>(`${this.baseUrl}/auth/login`, {
      nUSP,
      uniquePassword,
    }).pipe(
      tap(res => this.setToken(res.jwtToken))
    )
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token)
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey)
  }

  isAuthenticated(): boolean {
    const token = this.getToken()
    if (!token) { return false }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))

      const isExpired = payload.exp * 1000 < Date.now()

      if (isExpired) {
        this.logout()
        return false
      }

      return true
    } catch {
      this.logout()
      return false
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey)
  }
}

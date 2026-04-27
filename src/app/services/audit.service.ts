import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs'
import { AuditVoteResponse, VoteReceiptData } from '@models'

@Injectable({
  providedIn: 'root',
})
export class AuditService {
  private baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  auditVote(data: VoteReceiptData): Observable<AuditVoteResponse> {
    return this.http.post<AuditVoteResponse>(
      `${this.baseUrl}/audit`,
      data
    )
  }
}

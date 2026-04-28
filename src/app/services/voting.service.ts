import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment'
import {
  VoteReceiptData,
  VoteRequestModel,
  VotingDetailsModel,
  VotingModel,
} from '@models'

@Injectable({
  providedIn: 'root',
})
export class VotingService {
  private baseUrl = environment.baseUrl

  constructor(private http: HttpClient) {}

  getVotings(status?: 'active' | 'upcoming' | 'finished') {
    return this.http.get<VotingModel[]>(`${this.baseUrl}/voting`, {
      params: status ? { status } : {},
    })
  }

  getVotingById(id: string) {
    return this.http.get<VotingDetailsModel>(`${this.baseUrl}/voting/${id}`)
  }

  vote(votingId: string, data: VoteRequestModel) {
    return this.http.post<VoteReceiptData>(`${this.baseUrl}/vote/${votingId}`, data)
  }
}

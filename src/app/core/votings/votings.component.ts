import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { VotingModel } from '@models'
import { VotingService } from '@services'
import { formatDate } from '@utils'

@Component({
  selector: 'app-votings',
  templateUrl: './votings.component.html',
  styleUrls: ['./votings.component.scss'],
})
export class VotingsComponent implements OnInit {
  votings: VotingModel[] = []
  loading = true
  error = ''

  formatDate = formatDate

  constructor(
    private votingService: VotingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = false
    this.loadVotings()
  }

  loadVotings() {
    this.loading = true
    this.error = ''

    this.votingService.getVotings('active').subscribe({
      next: data => {
        this.votings = data
        this.loading = false
      },
      error: () => {
        this.error = 'Erro ao carregar votações!'
        this.loading = false
      },
    })
  }

  openVoting(id: string) {
    this.router.navigate(['/voting', id])
  }
}

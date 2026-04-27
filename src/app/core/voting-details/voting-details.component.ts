import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { /* ModalModel ,*/ VoteReceiptData, VotingDetailsModel } from '@models'
import { VotingService } from '@services'
import { formatDate } from '@utils'

@Component({
  selector: 'app-voting-details',
  templateUrl: './voting-details.component.html',
  styleUrls: ['./voting-details.component.scss'],
})
export class VotingDetailsComponent implements OnInit {
  voting?: VotingDetailsModel
  selectedOptionId: string | null = null
  isVotingStarted = false

  // openModal = false
  // redirectAfterClose = false
  // modal: ModalModel = {
  //   image: { src: '', alt: '' },
  //   text: '',
  //   url: '',
  //   title: '',
  //   contentType: 'text-only',
  // }

  receiptData?: VoteReceiptData
  voteStatus: 'idle' | 'success' | 'error' = 'idle'

  loading = true
  error = ''

  formatDate = formatDate

  constructor(
    private votingService: VotingService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!

    this.loadVoting(id)
  }

  startVoting() {
    this.isVotingStarted = true
  }

  loadVoting(id: string) {
    this.loading = true
    this.error = ''

    this.votingService.getVotingById(id).subscribe({
      next: res => {
        this.voting = res
        this.loading = false
      },
      error: () => {
        this.error = 'Erro ao carregar votação!'
        this.loading = false
      },
    })

    this.loading = false
  }

  selectOption(optionId: string) {
    this.selectedOptionId = optionId
  }

  vote() {
    if (!this.selectedOptionId || !this.voting) { return }
    this.voteStatus = 'idle'

    this.votingService.vote(this.voting.id, {
      optionId: this.selectedOptionId,
    }).subscribe({
      next: res => {
        this.receiptData = res
        this.voteStatus = 'success'
        // this.modal.title = 'Sucesso! Voto Registrado!'
      },
      error: () => {
        this.receiptData = undefined
        this.voteStatus = 'error'
        // this.modal.title = 'Erro! Vote Novamente!'
      },
    })

    // this.redirectAfterClose = true
    // this.openModal = true
  }

  goBack() {
    this.location.back()
  }

  // onModalChange(state: boolean) {
  //   this.openModal = state

  //   if (!state && this.redirectAfterClose) {
  //     this.redirectAfterClose = false
  //     this.router.navigate(['/votings'])
  //   }
  // }

  copyVoteReceipt() {
    if (!this.receiptData) {
      return
    }

    const text = `
      Hash: ${this.receiptData.hash}
      Nonce: ${this.receiptData.nonce}
      Signature: ${this.receiptData.signature}
    `.trim()

    navigator.clipboard.writeText(text)
  }

  goToAudit() {
    if (!this.receiptData) { return }

    this.router.navigate(['/audit'], {
      queryParams: {
        hash: this.receiptData.hash,
        nonce: this.receiptData.nonce,
        signature: this.receiptData.signature,
      },
    })
  }
}

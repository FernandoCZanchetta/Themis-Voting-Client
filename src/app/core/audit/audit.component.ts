import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router'
import { AuditVoteResponse, VoteReceiptData } from '@models'
import { AuditService } from '@services'

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss'],
})
export class AuditComponent implements OnInit {
  lines: string[] = []
  state: 'idle' | 'running' | 'done' | 'error' = 'idle'

  result?: AuditVoteResponse

  form = new FormGroup({
    hash: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    nonce: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    signature: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  })

  constructor(private auditService: AuditService, private route: ActivatedRoute) {}

  /* eslint-disable dot-notation */
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        hash: params['hash'] ?? '',
        nonce: params['nonce'] ?? '',
        signature: params['signature'] ?? '',
      })
    })
  }
  /* eslint-enable dot-notation */

  private addToTerminal(line: string, type: 'default' | 'error' | 'success' | 'warn' = 'default') {
    this.lines.push(`${type}:${line}`)
  }

  private clearTerminal() {
    this.lines = []
  }

  startAudit() {
    this.clearTerminal()

    if (this.form.invalid) {
      this.state = 'error'
      this.addToTerminal('✖ Por favor, preencha todos os campos para auditar o voto...', 'error')
      return
    }

    const payload: VoteReceiptData = this.form.getRawValue()

    this.lines = []
    this.state = 'running'

    this.addToTerminal('> Inicializando sistema de auditoria...')
    this.addToTerminal('> Carregando comprovante de votação...')

    setTimeout(() => {
      this.addToTerminal('> Checkando integridade do hash...')
      this.stepNonce(payload)
    }, 600)
  }

  private stepNonce(payload: VoteReceiptData) {
    setTimeout(() => {
      this.addToTerminal('> Checkando nonce... OK')
      this.stepSignature(payload)
    }, 700)
  }

  private stepSignature(payload: VoteReceiptData) {
    setTimeout(() => {
      this.addToTerminal('> Verificando assinatura digital... OK')
      this.callBackend(payload)
    }, 700)
  }

  private callBackend(payload: VoteReceiptData) {
    this.addToTerminal('> Contatando serviço de auditoria...')

    this.auditService.auditVote(payload).subscribe({
      next: res => {
        this.result = res

        if (res.valid) {
          if(res.revoked) {
            this.addToTerminal('⚠️ VOTO REVOGADO', 'warn')
          } else {
            this.addToTerminal('✔ VOTO VÁLIDO', 'success')
          }
          this.addToTerminal('>>> Id da Votação: ' + res.votingId, 'success')
          this.addToTerminal('>>> Data do Voto: ' + res.createdAt, 'success')
          this.addToTerminal('>>> Voto Revogado?: ' + res.revoked, 'success')
          this.state = 'done'
        } else {
          this.addToTerminal('✖ VOTE INVÁLIDO', 'error')
          this.state = 'error'
        }
      },
      error: () => {
        this.addToTerminal('✖ FALHA NA AUDITORIA', 'error')
        this.state = 'error'
      },
    })
  }
}

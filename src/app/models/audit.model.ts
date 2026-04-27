export interface AuditVoteResponse {
  valid: boolean
  votingId: string
  createdAt: string
  revoked: boolean
}

export interface VoteReceiptData {
  hash: string
  nonce: string
  signature: string
}

export interface VotingModel {
  id: string
  name: string
  description: string
  startAt: string
  endAt: string
}

export interface VotingOptionModel {
  id: string
  label: string
}

export interface VotingDetailsModel {
  id: string
  name: string
  description: string
  voteType: string
  startAt: string
  endAt: string
  votingOptions: VotingOptionModel[]
}

export interface VoteRequestModel {
  optionId: string
}

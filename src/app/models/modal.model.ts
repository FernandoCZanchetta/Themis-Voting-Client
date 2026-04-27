import { ImageModel } from './image.model'

export interface ModalModel {
  image?: ImageModel
  text?: string
  title: string
  url?: string
  contentType?: 'text-only' | 'custom-html'
}

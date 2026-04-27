import { Component, Input, OnInit } from '@angular/core'
import { SocialMedia, SocialMediaModel } from '@models'

@Component({
  selector: 'app-groups-panel',
  templateUrl: './groups-panel.component.html',
})
export class GroupsPanelComponent implements OnInit {
  @Input() size = 23
  @Input() color = ''

  ngOnInit(): void {
    this.color = this.color ? `text-${this.color}` : ''
  }

  groups: SocialMediaModel[] = [
    {
      name: SocialMedia.Instagram,
      url: 'https://www.instagram.com/sasel.usp/',
      available: true,
    },
    { name: SocialMedia.WhatsApp, url: '+55 (16) 99619-0880', available: true },
  ]
}

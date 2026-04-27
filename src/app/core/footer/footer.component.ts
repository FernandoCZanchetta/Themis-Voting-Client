import { Component } from '@angular/core'
import { SocialMedia, SocialMediaModel } from '@models'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  socialMedia: SocialMediaModel[] = [
    {
      name: SocialMedia.Facebook,
      url: 'https://www.facebook.com/sasel.usp',
      available: true,
    },
    {
      name: SocialMedia.Instagram,
      url: 'https://www.instagram.com/sasel.usp/',
      available: true,
    },
    {
      name: SocialMedia.TikTok,
      url: 'https://www.tiktok.com/@sasel.usp/',
      available: true,
    },
    { name: SocialMedia.WhatsApp, url: '+55 (16) 99619-0880', available: true },
    {
      name: SocialMedia.LinkedIn,
      url: 'https://www.linkedin.com/company/sasel-eesc-usp',
      available: true,
    },
    { name: SocialMedia.Email, url: 'sasel.usp@gmail.com', available: true },
    {
      name: SocialMedia.YouTube,
      url: 'https://www.youtube.com/channel/UCCIw2l3rNCepuZsugA4BC7w',
      available: true,
    },
    { name: SocialMedia.GitHub, url: 'https://github.com/sa-sel', available: true },
  ]
}

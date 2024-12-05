import { inject, Injectable } from "@angular/core";
import { ApiService } from "./api.service";

export interface ContactMailerDTO {
  names: string;
  email: string;
  company: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private api = inject(ApiService);

  sendNewDirectory(body: ContactMailerDTO) {
    const petitionUrl = 'compras/contact-261';

    return this.api.post(petitionUrl, body, false);
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  compartilhar(): void {
    const url = 'http://myapp-paulo-deploy.s3-website-sa-east-1.amazonaws.com/'; // Substitua pela URL que deseja compartilhar
    navigator.share({ url }); // Use a API de compartilhamento do navegador (disponível em navegadores compatíveis)
  }

}

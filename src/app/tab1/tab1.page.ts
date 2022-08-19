import { Component } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private httpClient: HttpClient
  ) {}

  saveImage() {

    this.httpClient.get('/assets/upload/bug.jpeg', {
      observe: 'body',
      responseType: 'blob'
    }).subscribe(async blob => {

      const data = await this.blobToBase64(blob);

      Filesystem.writeFile({
        path: 'test/bug.jpeg',
        data,
        directory: Directory.Cache
      }).then(wfRes => {
        console.log('COMPLETE!', wfRes);
      }).catch(e => {
        console.error('ERROR!', e);
      });

    });

  }

  private blobToBase64(blob) {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = reject;

      reader.onloadend = () => {
        const b64 = reader.result as string;
        resolve(b64);
      };
      reader.readAsDataURL(blob);
    });
  }

}

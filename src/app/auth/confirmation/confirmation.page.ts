import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import {LanguageService} from '../../../services/language/language.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
})
export class ConfirmationPage implements OnInit {

  texts: any;
  type: string;

  constructor(
      private navController: NavController,
      private language: LanguageService
  ) { }

  ngOnInit() {
    this.texts = {
      reset: {
        text: this.language.getWordByLanguage('resetConfirm'),
        button: 'OK'
      },
      verify: {
        text: this.language.getWordByLanguage('needVerify'),
        button: 'OK'
      },
      start: {
        text: this.language.getWordByLanguage('startQuestion'),
        button: this.language.getWordByLanguage('start')
      }
    };
    this.type = localStorage.getItem('confirmType');
  }

  navigateByType() {
    if (this.type === 'start') {
      this.navController.navigateForward('/tabs/surveys');
    } else {
      this.navController.navigateBack('/auth');
    }
  }

  navigateToMain() {
    this.navController.navigateForward('/tabs');
  }

}

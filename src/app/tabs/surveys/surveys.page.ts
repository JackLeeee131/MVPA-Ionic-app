import {Component, OnInit} from '@angular/core';
import {LanguageService} from '../../../services/language/language.service';
import {UserInterfaceService} from '../../../services/user-interface/user-interface.service';
import {Events, NavController} from '@ionic/angular';

@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.page.html',
    styleUrls: ['./surveys.page.scss'],
})
export class SurveysPage {

    constructor(
        private events: Events,
        private navController: NavController,
        private language: LanguageService,
        private ui: UserInterfaceService
    ) {
    }

    ionViewWillEnter() {
        this.ui.pageContainerScrollToTop(document.getElementsByClassName('page-container')[0] as HTMLDivElement);
    }

    checkScroll(e) {
        if (this.ui.watchPageControllerScrolled(e.target)) {
            this.events.publish('page-not-scrolled');
        } else {
            this.events.publish('page-scrolled');
        }
    }

    prepareSurvey(type: string) {
        localStorage.setItem('surveyType', type);
        this.navController.navigateForward('/tabs/prepare-survey').then(() => {});
    }

}

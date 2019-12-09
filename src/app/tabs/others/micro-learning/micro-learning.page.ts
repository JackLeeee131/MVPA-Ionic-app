import { Component } from '@angular/core';
import {LanguageService} from '../../../../services/language/language.service';
import {Events, NavController} from '@ionic/angular';
import {UserInterfaceService} from '../../../../services/user-interface/user-interface.service';
import {Video} from '../../../../interface/interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {UtilsService} from '../../../../services/utils/utils.service';

@Component({
  selector: 'app-micro-learning',
  templateUrl: './micro-learning.page.html',
  styleUrls: ['./micro-learning.page.scss'],
})
export class MicroLearningPage {

  api: string;
  videos: Video[];

  constructor(
      private http: HttpClient,
      private events: Events,
      private navController: NavController,
      private language: LanguageService,
      private ui: UserInterfaceService,
      private utils: UtilsService
  ) {
  }

  ionViewWillEnter() {
    this.ui.pageContainerScrollToTop(document.getElementsByClassName('page-container')[0] as HTMLDivElement);
    this.api = environment.api;
    this.getVideoList();
  }

  getVideoList() {
    this.utils.showLoading().then(loading => {
      this.http.get(environment.videoApi + 'list_video').subscribe((response: any) => {
        this.videos = response.data;
        console.log('video data', response.data)
        console.log('status', response.status)
        loading.dismiss();
      });
    });
  }

  checkScroll(e) {
    if (this.ui.watchPageControllerScrolled(e.target)) {
      this.events.publish('page-not-scrolled');
    } else {
      this.events.publish('page-scrolled');
    }
  }

  navigateToVideoSummary(video: Video) {
    video.file_link = this.api + video.file_link;
    localStorage.setItem('selectedVideo', JSON.stringify(video));
    this.events.publish('navigate-forward-url', 'video-summary');
  }

}

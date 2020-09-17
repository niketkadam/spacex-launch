import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { SpacexService } from './spacex.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'spacex-app';
  cardData: any;
  query = {};
  initDone = false;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,
              private service: SpacexService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.readQueryParam();
    }
  }

  readQueryParam() {
    this.route.queryParams.subscribe((res) => {
      this.query = res;
      // this.service.updateQueryParams(res);
      this.getData();
    });
    this.service.queryState$.subscribe((res) => {
      this.query = res;
      this.router.navigate([], {
        queryParams: this.query
      });
    });

  }

  getData() {
    this.service.getDetails(this.query).subscribe(res => {
      this.cardData = res;
      console.log(this.cardData);
    });
  }
}

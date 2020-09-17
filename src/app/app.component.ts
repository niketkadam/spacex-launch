import { Component, OnInit } from '@angular/core';
import { SpacexService } from './spacex.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
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
  constructor(private service: SpacexService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.readQueryParam();
  }

  readQueryParam() {
    // if (!this.initDone) {
    this.route.queryParams.subscribe((res) => {
      this.query = res;
      // this.service.updateQueryParams(res);
      this.getData();
    });
    // this.initDone = true;
    // }
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

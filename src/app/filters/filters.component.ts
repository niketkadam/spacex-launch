import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Years } from '../constants/spacex';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { SpacexService } from '../spacex.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  filterForm: FormGroup;
  years = Years;
  queryParams = {};
  booleanData = ['True', 'False']
  constructor(
    private fb: FormBuilder, public route: ActivatedRoute, private router: Router, private service: SpacexService
  ) {

  }

  ngOnInit() {
    this.filterForm = this.fb.group({
      launchYear: [null],
      launch: [null],
      landing: [null]
    });
    this.onChange();
    this.readQueryParam()
  }

  readQueryParam(){
    // this.route.queryParams.subscribe((res) => {
    //   this.queryParams = res;
    //   if(res){
    //     this.filterForm.get('launchYear').setValue(res.launch_year);
    //     this.filterForm.get('launch').setValue(res.launch);
    //   }
    //   console.log(res);
    // });
  }

  onChange() {
    this.filterForm.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe(val => {
      console.log(val);
      this.setQuery(val);
    });
  }

  setQuery(val) {
    this.queryParams = {
      'lauch_success': val.launch ? val.launch : null,
      'land_success': val.landing ? val.landing : null,
      'launch_year': val.launchYear ? val.launchYear : null,
    };
    this.service.updateQueryParams(this.queryParams);
  //   this.router.navigate([], {
  //     queryParams: this.queryParams
  //   });
}
}

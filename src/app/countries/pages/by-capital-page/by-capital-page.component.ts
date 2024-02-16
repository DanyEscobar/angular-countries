import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  searchBy( term: string ): void {
    if ( term !== '' && term.replace(/^\s+/, '').length !== 0 ) {
      this.isLoading = true;
      this.countriesService.searchBy( 'capital', term, 'byCapital', '' )
        .subscribe( countries => {
          this.countries = countries;
          this.isLoading = false;
        } );
    }
    this.countries = [];
    this.countriesService.cacheStore.byCapital.term = '';
    this.countriesService.cacheStore.byCapital.countries = [];
  }

}

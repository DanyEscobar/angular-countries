import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  searchBy( term: string ): void {
    if ( term !== '' && term.replace(/^\s+/, '').length !== 0 ) {
      this.isLoading = true;
      this.countriesService.searchBy( 'name', term, 'byCountries', '' )
        .subscribe( countries => {
          this.countries = countries;
          this.isLoading = false;
        } );
    }
    this.countries = [];
    this.countriesService.cacheStore.byCountries.term = '';
    this.countriesService.cacheStore.byCountries.countries = [];
  }
}

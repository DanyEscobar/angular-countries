import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';

import { Continent } from '../../interfaces/region.type';
import { Country } from '../../interfaces/country';



@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: `
    .btn-continent:hover {
      color: #fff;
      background-color: #0d6efd;
      border-color: #0d6efd;
    }
  `
})
export class ByRegionPageComponent implements OnInit {

  public regions: Country[] = [];
  public continents: Continent[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  public selectedContinent?: Continent;
  public initialValue: string = '';

  constructor( private countriesService: CountriesService ) {}

  ngOnInit(): void {
    this.regions = this.countriesService.cacheStore.byRegion.countries;
    this.selectedContinent = this.countriesService.cacheStore.byRegion.region;
  }

  searchBy( region: Continent ): void {
    this.selectedContinent = region;
    this.countriesService.searchBy( 'region', region, 'byRegion', region )
      .subscribe( regions => {
        this.regions = regions;
      } );
  }

}

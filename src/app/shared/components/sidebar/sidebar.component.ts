import { Component } from '@angular/core';
import { CountriesService } from '../../../countries/services/countries.service';
import { Country } from '../../../countries/interfaces/country';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styles: ``
})
export class SidebarComponent {

  public countries: Country[] = [];

  constructor( private countriesService: CountriesService ) {}

  searchBy( by: string ): void {
    this.countriesService.searchBy( by, '', '', '' )
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Continent } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1'
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor( private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem( 'cacheStore', JSON.stringify( this.cacheStore ) );
  }

  private loadFromLocalStorage() {
    if( !localStorage.getItem( 'cacheStore' ) ) return;

    this.cacheStore = JSON.parse( localStorage.getItem( 'cacheStore' )! );
  }

  private getCountriesRequest( url: string): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of( [] ) ),
        // delay( 1000 )
      );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`
    return this.http.get<Country[]>( url )
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null ),
      catchError( () => of( null ) )
    );
  }

  searchBy( by: string, term: string, option: string, region: Continent ): Observable<Country[]>  {
    const url = `${this.apiUrl}/${by}/${term}`
    if ( option === 'byCapital' ) {
      return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
    } else if( option === 'byCountries' ) {
      return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byCountries = { term, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
    } else {
      return this.getCountriesRequest( url )
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries } ),
        tap( () => this.saveToLocalStorage() )
      );
    }
  }
}

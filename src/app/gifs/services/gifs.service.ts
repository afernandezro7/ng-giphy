import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
    private _historial: string[] = [];
    public resultados: Gif[] = [];
    private api_key: string = 'x8QWOtwj3uFXU1AzU3mkXBQB2YHP9ZvP';
    private api_url: string = 'https://api.giphy.com/v1/gifs/search';
    

    get historial() {
        return [...this._historial];
    }

    constructor(private http: HttpClient) {
        this._historial = JSON.parse(localStorage.getItem('historial')!) || []
        this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
    }

    buscarGifs(query: string) {
        const queryLower: string = query.trim().toLowerCase();

        //crear array de busquedas
        if (!this._historial.includes(queryLower)) {
            this._historial.unshift(queryLower);
            this._historial = this._historial.splice(0, 9);         
            localStorage.setItem('historial',JSON.stringify(this._historial))
        }

        //obtener datos de la api
        const params = new HttpParams()
                .set('api_key',this.api_key)
                .set('limit', '10')
                .set('q', queryLower)
        ;
        this.http.get<SearchGifsResponse>(`${this.api_url}`, { params } )
            .subscribe( resp  => {
                this.resultados = resp.data;
                localStorage.setItem('resultados',JSON.stringify(this.resultados))
            })
        ;



    }

   
}

import { Injectable } from '@angular/core';
import  { HttpClient } from '@angular/common/http';
import { RespuestaToHeadLines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadLines()
  {
    return this.http.get<RespuestaToHeadLines>
    ('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=f6d6c3fbb768448c8064797d903cc9ed');
  }

}

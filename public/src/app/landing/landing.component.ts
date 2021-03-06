import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  booksYouMightLike; 
  categories: Array<string>;

  constructor(
    private http: HttpService
  ) {
    this.categories = [
      'Business',
      'Philosophy',
      'Self Help',
      'Classics',
      'Politics',
      'Autobiography'
    ];
  }

  ngOnInit(): void {
    window.scroll(0,0)

    let params = {
      random: true,
      limit: 5,
      select: [
        'title', 
        'product_id',
        'UPC',
        'short_product_desc'
      ]
    };

    if (!sessionStorage.getItem('randomBooks')) {
      this.http.getRandomPicks(params).toPromise()
        .then((results) => {
          sessionStorage.setItem('randomBooks', JSON.stringify(results));
        })
        .then(() => {
          this.booksYouMightLike = JSON.parse(sessionStorage.getItem('randomBooks'));
        })
    } else {
    this.booksYouMightLike = JSON.parse(sessionStorage.getItem('randomBooks'));
    }
  }

}


import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../share/rest-api.service";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  Article: any = [];
  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadEmployees()
    console.log('oninit')
  }

  // Get employees list
  loadEmployees() {
    return this.restApi.getArticles().subscribe((data: {}) => {
      this.Article = data;
      console.log(data)
    })
  }
}

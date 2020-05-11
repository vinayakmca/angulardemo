import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Page} from '../../model/page';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() maxPages: number;
  @Input() current: number;
  @Input() postsPerPage: number[];
  @Input() itemsPerPage: number;

  @Output() changePage = new EventEmitter();

  pages: any[] = [];
  pageModel: Page = {
    page: this.current,
    itemsPerPage: this.itemsPerPage
  };

  constructor() { }

  ngOnInit() {
  
    if (this.maxPages) {
      this.createPages();
    }
  }

  setPage(page: number, perPage: number) {
    this.pageModel.page = page;
    this.pageModel.itemsPerPage = perPage;
    this.changePage.emit(this.pageModel);
  }

  createPages() {
    console.log("pagination max page "+this.maxPages);
    this.pages.splice(0,this.pages.length);
    for(let i=1; i <= this.maxPages; i++) {
      this.pages.push(i);
    }
  }

  ngOnChanges(changes) {
    console.log("max page on chnage"+this.maxPages);
    this.createPages();
  }
}

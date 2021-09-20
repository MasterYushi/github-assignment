import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input('numOfPages') count!: number;
  @Output() pageChange = new EventEmitter<number>();
  activePage = 1;
  countArray: number[] = [];

  ngOnChanges(): void {
    this.countArray = [];

    for (let index = 0; index < this.count; index++) {
      this.countArray[index] = index + 1;
    }

    // console.table(this.countArray);
  }

  onPageChange(event: any): void {
    this.activePage = event.target.innerText;
    // event.target.parentElement.classList.toggle('active');

    this.pageChange.emit(this.activePage);
  }
}

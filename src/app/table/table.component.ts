import { Component, OnInit, ViewChild } from '@angular/core';
import { RestService } from '../Shared/http/rest.service';

import { map } from 'rxjs/internal/operators/map';
import { Subscription } from 'rxjs';
import { Product } from '../Shared/model/product.model';

import { orderBy } from 'lodash';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'price', 'category'];
  public dataSource: any; 


  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  constructor(
    private _restService: RestService,
    private _liveAnnouncer: LiveAnnouncer
    ) 
    { }

  public ngOnInit(): void {
    this.getProductData();
  }

  ngAfterViewInit() {    
    this.dataSource.sort = this.sort;
  }


  public getProductData(): void{

    this._restService.getProductData()
    .pipe(
      map((result:any) => {
        return result['cookies'];
      })
    )
    .subscribe(result => {
      console.log('result', result);
      this.dataSource = new MatTableDataSource(result);
    }, error => {
      console.log(error);
    });

  }

  
  public ngOnDestroy(): void{
  }

  public announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      console.log('aaa');
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      console.log('bbb');
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


}

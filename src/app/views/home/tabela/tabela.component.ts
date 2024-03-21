import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { HttpClient } from '@angular/common/http';

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrl: './tabela.component.scss'
})

export class TabelaComponent implements AfterViewInit {

  private apiUrl = 'https://jsonplaceholder.typicode.com/photos/';

  displayedColumns: string[] = ['albumId', 'id', 'title', 'url', 'thumbnailUrl'];

  //dataSource = new MatTableDataSource(ELEMENT_DATA);
  dataSource = new MatTableDataSource<Photo>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Faça a solicitação HTTP para obter os dados
    this.http.get<Photo[]>(this.apiUrl).subscribe((data: Photo[]) => {
      this.dataSource.data = data; // Preencha a fonte de dados com os dados obtidos
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( public loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}

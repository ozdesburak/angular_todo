import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private dataService: DataService) { }
  p = 1;
  size = 10;
  todos: any = [];
  user: any = [];
  checks: boolean = false;
  input: string = '';


  ngOnInit(): void {
    this.getTodo();
    this.getUser();

    // this.getMethot2();
    // this.getUserMethot2();

  }

  public userSearch(Id: string) {
    let result = this.user.find((user: any) => user.id === Id);
    return result?.name
  }

  public sort() {
    this.todos.sort(function (a: any, b: any) { return a.completed - b.completed });

  }

  public checkTodo(event: any) {
    this.checks = event?.target?.value

  }

  public inputValue(event: any) {
    this.input = event?.target?.value
  }

  public fieldsChange(values: any): void {
  }

  public getTodo() {
    this.dataService.getTodo().subscribe((data) => {
      console.log('data', data)
      this.todos = data
    })
  }

  public getUser() {
    this.dataService.getUser().subscribe((user) => {
      console.log('data', user)
      this.user = user
    })
  }

  // public async getMethot2() {
  //  const result = await  this.dataService.getTodo()
  //  this.todos = result
   
  // }

  // public async getUserMethot2() {
  //    const result = await  this.dataService.getUser()
  //    this.user = result
  // }

  public update(id: any) {
    const params = { title: this.input, completed: this.checks }
    this.dataService.patch(id, params).subscribe((user) => {
    })
  }

  public delete(id: any) {
    const params = {}
    this.dataService.delete(id, params).subscribe((user) => {
      this.todos.forEach((item: any, index: any) => {
        if (item.id === id) this.todos.splice(index, 1);
      });
    })
  }



}

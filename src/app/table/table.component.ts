import { Component, OnDestroy, OnInit } from "@angular/core";
import { DataService } from "src/services/data.service";
import {User} from '../models/user';
import {Todo} from '../models/todo';
import { Subscription } from "rxjs";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit, OnDestroy  {
  private subscription: Subscription = new Subscription()
  constructor(private dataService: DataService) {}
  selectedItem: any;
  p  : number= 1;
  size :number= 10;
  todos: Todo[] = [];
  user: User[] = [];
  checks: boolean = false;
  input: string = "";

  ngOnInit(): void {
    this.getTodo();
    this.getUser();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    
    console.log('ngOnDestroy: cleaning up...');
  }

  public   userSearch(Id: number |undefined) {
    let result =  this.user.find((user: any) => user.id === Id);
    return result?.name;
  }

  public sort(status: boolean) {
    if (status == true)
      this.todos.sort((a: any, b: any) => {
        return a.completed - b.completed;
      });
    else
      this.todos.sort((a: any, b: any) => {
        return b.completed - a.completed;
      });
  }
 
  public async getTodo() {
    
    const todoObserver={
      next: (todo: Todo[]) => (this.todos = todo),
      error: (err: any) => console.log(err)
    }

    this.subscription.add( 
      await this.dataService.findAllTodo().subscribe(todoObserver)
    )
   
  }

  public async getUser() {

    const userObserver={
      next: (user: User[]) => (this.user = user),
      error: (err: any) => console.log(err)
    }
    this.subscription.add(
      await this.dataService.findAllUser().subscribe(userObserver)
    )
    
  }

  public async update(id: number) {

    const params = { title: this.selectedItem.title, completed:  this.selectedItem.completed};
    this.subscription.add(
      await this.dataService.patch(id, params).subscribe((user) => {})
    )
  }

  public async  delete(id: number) {
    const params = {};
    this.subscription.add( 
      await this.dataService.delete(id, params).subscribe((user) => {
        this.todos.forEach((item: any, index: any) => {
          if (item.id === id) this.todos.splice(index, 1);
  
        });
      })
    )
    
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../common/todo';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy {
  TODO = 'TODO';
  subs = new Subscription();

  todos: Todo[] = [
    new Todo('1', 'mow the lawn', 'todo'),
    new Todo('2', 'wash dishes', 'todo'),
    new Todo('3', 'return book', 'todo')
  ];

  constructor(dragulaService: DragulaService) {
    dragulaService.createGroup(this.TODO, {
      removeOnSpill: true,
      accepts: function (el, target, source, sibling) {
        return target.id !== source.id; // elements can be dropped in any of the `containers` by default
      },
    });
    this.subs.add(dragulaService.drag(this.TODO)
      .subscribe(({ name, el, source }) => {
        if (source.id === 'todo') {
          console.log('DRAG EVENT');
          console.log(name);
          console.log(el);
          console.log(source);
        }
      })
    );
    this.subs.add(dragulaService.drop(this.TODO)
      .subscribe(({ name, el, target, source, sibling }) => {
        if (target.id === 'todo') {
          console.log('DROP EVENT');
          console.log(name);
          console.log(el);
          console.log(target);
          console.log(source);
          console.log(sibling);
          this.updateState(source.id, target.id);
        }
      })
    );

    this.subs.add(dragulaService.dropModel(this.TODO)
      .subscribe(({ name, el, target, source, sibling, sourceModel, targetModel, item }) => {
        console.log('DROP MODEL EVENT');
        console.log(name);
        console.log(el);
        console.log(target);
        console.log(source);
        console.log(sibling);
        console.log(sourceModel);
        console.log(targetModel);
        console.log(item);
      })
    );

    this.subs.add(dragulaService.over(this.TODO)
      .subscribe(({ el, container }) => {
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(dragulaService.out(this.TODO)
      .subscribe(({ el, container }) => {
        this.removeClass(container, 'ex-over');
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  private hasClass(el: Element, name: string): any {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: Element, name: string): void {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: Element, name: string): void {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  getTodos(): Todo[] {
    return this.todos.filter(todo => todo.state === 'todo');
  }

  updateState(todoId: string, newState: string) {
    console.log('Here we trigger event that will change target state and update id');
  }
}

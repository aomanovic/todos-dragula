import { Component, OnInit } from '@angular/core';
import { Todo } from '../common/todo';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.css']
})
export class DoneComponent implements OnInit {
  doneTasks: Todo[] = [
    new Todo('1', 'add some karma tests', 'done')
  ];

  TODO = 'TODO';
  subs = new Subscription();

  constructor(dragulaService: DragulaService) {
    this.subs.add(dragulaService.drag(this.TODO)
      .subscribe(({ name, el, source }) => {
        if (source.id === 'done') {
          console.log('DRAG EVENT');
          console.log(name);
          console.log(el);
          console.log(source);
        }
      }
      ));

    this.subs.add(dragulaService.drop(this.TODO)
      .subscribe(({ name, el, target, source, sibling }) => {
        if (source.id === 'done') {
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
        if (target.id === 'done') {
          console.log('DROP MODEL EVENT');
          console.log(name);
          console.log(el);
          console.log(target);
          console.log(source);
          console.log(sibling);
          console.log(sourceModel);
          console.log(targetModel);
          console.log(item);
        }
      })
    );
  }

  ngOnInit() {
  }

  getDoneTasks(): Todo[] {
    return this.doneTasks.filter(todo => todo.state === 'done');
  }

  updateState(todoId: string, newState: string) {
    console.log('Here we trigger event that will change target state and update id');
  }
}

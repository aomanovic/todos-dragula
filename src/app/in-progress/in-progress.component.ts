import { Component, OnInit } from '@angular/core';
import { Todo } from '../common/todo';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent implements OnInit {
  inProgressTasks: Todo[] = [
    new Todo('1', 'make dragula app', 'in-progress')
  ];

  TODO = 'TODO';
  subs = new Subscription();

  constructor(dragulaService: DragulaService) {
    this.subs.add(dragulaService.drag(this.TODO)
      .subscribe(({ name, el, source }) => {
        if (source.id === 'in-progress') {
          console.log('DRAG EVENT');
          console.log(name);
          console.log(el);
          console.log(source);
        }
      })
    );
    this.subs.add(dragulaService.drop(this.TODO)
      .subscribe(({ name, el, target, source, sibling }) => {
        if (target.id === 'in-progress') {
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
  }

  ngOnInit() {
  }

  getInProgressTasks(): Todo[] {
    return this.inProgressTasks.filter(todo => todo.state === 'in-progress');
  }

  updateState(todoId: string, newState: string) {
    console.log('Here we trigger event that will change target state and update id');
  }
}

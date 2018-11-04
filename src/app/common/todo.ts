export class Todo {
    id: string;
    title: string;
    state: string;

    constructor( id: string, title: string, state: string ) {
      this.id = id;
      this.title = title;
      this.state = state || 'todo';
    }
  }

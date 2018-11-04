import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { InProgressComponent } from './in-progress/in-progress.component';
import { DoneComponent } from './done/done.component';
import { DragulaModule, DragulaService } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    InProgressComponent,
    DoneComponent
  ],
  imports: [
    BrowserModule,
    DragulaModule
  ],
  providers: [DragulaService],
  bootstrap: [AppComponent]
})
export class AppModule { }

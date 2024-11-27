import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/transcript.model';
import { TaskCardComponent } from './task-card.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskCardComponent],
  template: `
    <section class="tasks">
      <h2>Action Items</h2>
      <div class="task-list">
        @for (task of tasks; track task.description) {
          <app-task-card [task]="task" />
        }
      </div>
    </section>
  `,
  styles: [`
    .tasks {
      background: var(--bg-card);
      border-radius: var(--border-radius);
      padding: 24px;
      margin: 20px 0;
    }
    
    .task-list {
      display: grid;
      gap: 16px;
      margin-top: 20px;
    }

    h2 {
      color: var(--text-primary);
      margin-bottom: 16px;
    }
  `]
})
export class TasksComponent {
  @Input() tasks: Task[] = [];
}
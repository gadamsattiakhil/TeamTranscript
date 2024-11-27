import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from './app/components/file-upload/file-upload.component';
import { SummaryComponent } from './app/components/summary/summary.component';
import { EngagementComponent } from './app/components/engagement/engagement.component';
import { TasksComponent } from './app/components/tasks/tasks.component';
import { PerplexityService } from './app/services/perplexity.service';
import { TranscriptAnalysis } from './app/models/transcript.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FileUploadComponent,
    SummaryComponent,
    EngagementComponent,
    TasksComponent
  ],
  template: `
    <div class="app-container">
      <button class="mode-toggle">Light Mode</button>
      <h1>Teams Transcript Analysis</h1>
      
      <div class="content-grid">
        <app-file-upload (fileSelected)="onFileSelected($event)" />
        
        @if (analysis) {
          <app-summary [summary]="analysis.summary" />
          <app-engagement [participants]="analysis.participants" />
          <app-tasks [tasks]="analysis.tasks" />
        }
      </div>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    h1 {
      font-size: 2.5rem;
      color: var(--accent-purple);
      margin-bottom: 40px;
      text-align: center;
    }

    .content-grid {
      display: grid;
      gap: 24px;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }
    }
  `]
})
export class App {
  analysis: TranscriptAnalysis | null = null;

  constructor(private perplexityService: PerplexityService) {}

  onFileSelected(transcript: string) {
    this.perplexityService.analyzeTranscript(transcript)
      .subscribe(analysis => {
        this.analysis = analysis;
      });
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    PerplexityService
  ]
}).catch(err => console.error(err));
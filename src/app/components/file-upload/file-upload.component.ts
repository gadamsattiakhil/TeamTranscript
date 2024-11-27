import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  template: `
    <div class="upload-container">
      <div class="upload-icon">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>
      <h2>Upload Teams Transcript</h2>
      <p>Drop your Microsoft Teams transcript file here or click to browse</p>
      <input
        type="file"
        (change)="onFileSelected($event)"
        accept=".txt,.doc,.docx"
        class="file-input"
      />
      <button class="upload-button">Upload File</button>
    </div>
  `,
  styles: [`
    .upload-container {
      background: var(--bg-card);
      border: 2px dashed #333;
      border-radius: var(--border-radius);
      padding: 40px;
      text-align: center;
      margin: 20px 0;
      cursor: pointer;
      transition: border-color 0.3s ease;
    }

    .upload-container:hover {
      border-color: var(--accent-purple);
    }

    .upload-icon {
      color: var(--accent-purple);
      margin-bottom: 20px;
    }

    .file-input {
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    .upload-button {
      background: var(--accent-purple);
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: var(--border-radius);
      font-weight: 500;
      margin-top: 20px;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }

    .upload-button:hover {
      opacity: 0.9;
    }
  `]
})
export class FileUploadComponent {
  @Output() fileSelected = new EventEmitter<string>();

  async onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const text = await file.text();
      this.fileSelected.emit(text);
    }
  }
}
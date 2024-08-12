import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, NgModel, Validators } from '@angular/forms';
import { TranslateService } from '../../../service/translate.service';
import { LayoutService } from '../../../service/layout.service';
import { Router } from '@angular/router';
import { ChevronIconComponent } from "../../../ui-components/chevron-icon/chevron-icon.component";
import { ButtonStandardComponent } from "../../../ui-components/button-standard/button-standard.component";
type ContactField = 'name' | 'email' | 'message';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    ChevronIconComponent,
    ButtonStandardComponent
],

  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(
    public translateService: TranslateService,
    public layoutService: LayoutService,
    private http: HttpClient,
    private router: Router,
    private fbuilder: FormBuilder
  ) { 
    this.formData = this.fbuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });

  }
  [x: string]: any;
  isAgreed: boolean = false;
  mailTest: boolean = false;
  isLoading: boolean = false;
  isSending: boolean = false;
  isError: boolean = false;

  emailTouched: boolean = false;
  emailValidated: boolean = false;

  textareaContent: string = '';

  @ViewChild('lineEmail') lineEmail!: ElementRef;
  @ViewChild('lineName') lineName!: ElementRef;
  @ViewChild('lineTextarea') lineTextarea!: ElementRef;
  
  contactData = {
    name: '',
    email: '',
    message: ''
  }
  
  formData: FormGroup = this.fbuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(4)]],
    checkbox: [false, Validators.requiredTrue]
  });
  
  post = {
    endPoint: 'https://portfolio.swen-breitung.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };


  navigateToPolicy() {
    this.router.navigate(['/policy']);
  }


  onSubmit(ngForm:NgForm) {
    if (ngForm.submitted && ngForm.valid && !this.mailTest) {
      this.isLoading = true;
      this.http.post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response: any) => {
            ngForm.resetForm();
          },
          error: (error: any) => {
            setTimeout(() => {
              console.error(error);
              this.isLoading = false;
              this.isSending = true;
              this.isError = true;
            }, 2000);
          },
          complete: () => {
            console.info('send post complete');
            setTimeout(() => {
              this.isLoading = false;
              this.isSending = true;
              this.isError = false;
            }, 1000);
          },
        });
    } else if (ngForm.submitted && ngForm.valid && this.mailTest) {
      this.isLoading = true;
      console.log('testing erfolgreich')
      setTimeout(() => {
        ngForm.resetForm();
        this.isLoading = false;
      }, 3000);
      ngForm.resetForm();
    }
  }


  torgleIsSending() {
    this.isSending = !this.isSending;
  }

  onFocus(fieldName: ContactField) {
    const line = this.getLineElement(fieldName);
    if(!line){
      return
    }
      line.nativeElement.classList.remove('slide-out');
      line.nativeElement.classList.add('slide-in');
  }

  onBlur(fieldName: ContactField, control: NgModel) {
    const line = this.getLineElement(fieldName);
    if (line) {
      line.nativeElement.classList.remove('slide-in');
      line.nativeElement.classList.add('slide-out');

      if (control.invalid && (control.dirty || control.touched) && this.contactData[fieldName].length > 0) {
        line.nativeElement.classList.add('error-line');
      } else {
        line.nativeElement.classList.remove('error-line');
      }
    }
  }

  getLineElement(fieldName: ContactField): ElementRef | null {
    const lines: { [key in ContactField]: ElementRef } = {
      email: this.lineEmail,
      name: this.lineName,
      message: this.lineTextarea,
    };
    return lines[fieldName] || null;
  }

  autoGrow(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (textarea) {
      textarea.style.height = 'auto'; // Setzt die Höhe zurück, um den Scrollbereich zu ermitteln
      textarea.style.height = textarea.scrollHeight + 'px'; // Setzt die Höhe auf die Scrollhöhe
    }
  }
}

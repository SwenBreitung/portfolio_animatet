import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { TranslateService } from '../../../service/translate.service';
import { LayoutService } from '../../../service/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
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
  ) { }
  [x: string]: any;
  isAgreed: boolean = false;
  mailTest: boolean = false;
  isLoading: boolean = false;
  isSending: boolean = false;
  isError: boolean = false;

  emailTouched: boolean = false;
  emailValidated: boolean = false;


  @ViewChild('line') line!: ElementRef;
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

  onFocus() {
    this.line.nativeElement.classList.remove('slide-out');
    this.line.nativeElement.classList.add('slide-in');
  }

  onBlur() {
    this.line.nativeElement.classList.remove('slide-in');
    this.line.nativeElement.classList.add('slide-out');
    this.emailTouched = true;
    
  }
}

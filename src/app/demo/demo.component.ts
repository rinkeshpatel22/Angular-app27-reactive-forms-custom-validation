import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})

export class DemoComponent implements OnInit {
  public demoFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.demoFormGroup = this.formBuilder.group({
      fname: ['', [Validators.required, this.whitespaceValidator]],
      lname: ['', [Validators.required, this.whitespaceValidator]],
      email: ['', [Validators.required, this.whitespaceValidator, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]]
    });
  }

  // validate if user enters blank space and try to submit
  private whitespaceValidator(control: FormControl): Validators {
    return (control.value || '').trim().length === 0 ? { 'required': true } : null;
  }

  public onFormSubmit(): void {
    if (this.demoFormGroup.invalid) {
      this.demoFormGroup.get('fname').markAsTouched();
      this.demoFormGroup.get('lname').markAsTouched();
      this.demoFormGroup.get('email').markAsTouched();
      return;
    }
    var name = this.demoFormGroup.value.fname + " " + this.demoFormGroup.value.lname;
    var email = this.demoFormGroup.value.email;
    alert("Submitted : \n Name: " + name + "\n Email: " + email);
  }
}

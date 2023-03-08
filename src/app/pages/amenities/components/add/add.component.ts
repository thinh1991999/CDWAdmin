import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  public form: FormGroup;
  public name = '';
  public description = '';
  loading: boolean = false;
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.name, [Validators.required]),
      description: new FormControl(this.description, [Validators.required]),
    });
  }
  public add(): void {
    if (this.form.valid) {
      this.loading = true;
    } else {
    }
  }
}

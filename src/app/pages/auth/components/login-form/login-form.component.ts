import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<void>();
  public form: FormGroup;
  public flatlogicEmail = '';
  public flatlogicPassword = '';
  public errMess: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.flatlogicEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.flatlogicPassword, [Validators.required]),
    });
  }

  public login(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authService
        .login(this.form.value)
        .then((res) => {
          console.log(res);

          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.errMess = err.message;
          this.loading = false;
        });
    } else {
      this.errMess = 'Something error, try again.';
    }
  }
}

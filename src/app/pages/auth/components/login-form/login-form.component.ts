import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { AuthService } from '../../services';
import { routes } from '../../../../consts';

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
  public routers: typeof routes = routes;

  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.flatlogicEmail, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl(this.flatlogicPassword, [Validators.required]),
    });
    for (let i in this.form.controls) {
      console.log(this.form.controls[i]);
    }
  }

  public login(): void {
    if (this.form.valid) {
      this.loading = true;
      this.authService
        .login(this.form.value)
        .then((res) => {
          const { user, token } = res.data;
          this.globalService.login(user, token);
          this.router.navigate([this.routers.DASHBOARD]).then();
          this.loading = false;
        })
        .catch((err) => {
          this.errMess =
            err.response.data.error || 'Something error, try again';
          this.loading = false;
        });
    } else {
      this.errMess = 'Something error, try again.';
    }
  }

  hideMess() {
    this.errMess = '';
  }
}

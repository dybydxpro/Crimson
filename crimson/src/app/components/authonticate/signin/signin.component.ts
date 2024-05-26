import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticateService } from '../../../auth/authenticate.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../shared/local-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent implements OnInit {
  validationForm: UntypedFormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authenticateService: AuthenticateService,
    private authService: AuthService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      password: ['', [Validators.required]],
    });
  }

  submitLogin(): void {
    if(!this.isLoading){
      this.isLoading = true;
      let email: string = this.validationForm.get('email')?.value;
      let password: string = this.validationForm.get('password')?.value;

      this.authService.signIn(email, password)
        .then((res: any) => {
          this.localStorageService.setItem("uid", res.user.multiFactor.user.uid);
          this.localStorageService.setItem("token", res.user.multiFactor.user.accessToken);
          this.getUserData(res.user.multiFactor.user.uid);
        }).catch((err: any) => {
          console.error(err);
          this.openSnackBar(err.message);
          this.isLoading = false;
        });
    }
  }

  getUserData(uid: string): void {
    this.userService.getUserByUid(uid).subscribe(
      (res: any) => {
        this.localStorageService.setItem("user", JSON.stringify(res[0]));
        this.isLoading = false;
        this.redirectToHome();
      }, (err: any) => {
        console.error(err);
        this.openSnackBar(err.message);
        this.isLoading = false;
      });
  }

  redirectToRegister(): void {
    this.router.navigate(['/sign-up']);
  }

  redirectToHome(): void {
    this.router.navigate(['/']);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: "end",
      verticalPosition: "bottom",
    });
  }
}

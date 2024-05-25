import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticateService } from '../../../auth/authenticate.service';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  validationForm: UntypedFormGroup;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private authenticateService: AuthenticateService,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      name: ["", [Validators.required]],
      email: [
        "",
        [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      password: ["", [Validators.required]],
    });
  }

  submitSignup(): void {
    if(!this.isLoading){
      this.isLoading = true;
      let name: string = this.validationForm.get('name')?.value;
      let email: string = this.validationForm.get('email')?.value;
      let password: string = this.validationForm.get('password')?.value;

      this.authService.signUp(email, password)
        .then((res: any) => {
          this.saveUser(res.user.multiFactor.user.uid, name, email);
        }).catch((err: any) => {
          console.error(err);
          this.openSnackBar(err.message);
          this.isLoading = false;
        });
    }
  }

  saveUser(uid: string, name: string, email: string): void {
    let user: any = {
      "uid": uid,
      "name": name,
      "email": email
    };

    this.userService.createUser(user)
      .then((res: any) => {
        this.redirectToLogin();
      }).catch((err: any) => {
        console.error(err);
      }).finally(() => {
        this.isLoading = false;
      });
  }

  redirectToLogin(): void {
    this.router.navigate(["/sign-in"]);
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Close', {
      horizontalPosition: "end",
      verticalPosition: "bottom",
    });
  }
}

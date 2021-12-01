import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, UrlSerializer } from '@angular/router';
import { User } from '../shared/user';
import { AuthService } from '../shared/auth.service';
import { Jwtresponse } from '../shared/jwtresponse';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  //declare Variables
  loginForm!: FormGroup;
  isSubmitted = false;
  loginUser: User = new User();
  error = '';
  jwtResponse: any = new Jwtresponse()



  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) { }



  ngOnInit(): void {
    //FormGroup
    this.loginForm = this.formBuilder.group(
      {
        UserName: ['', [Validators.required, Validators.minLength(2)]],
        UserPassword: ['', [Validators.required]]
      }
    );
  }
  //Get controls
  get formControls() {
    return this.loginForm.controls;
  }

  //login -- verify credentials
  loginCredentials() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;

    //invalid
    if (this.loginForm.invalid) {
      return;
    }
    //valid
    //#region Valid
    if (this.loginForm.valid) {

      //calling method from AuthService --Authorization and Authentication
      this.authService.loginVerify(this.loginForm.value)
        .subscribe(data => {
          console.log(data);
          //token with roleid and name
          this.jwtResponse = data;
          //either local/sesion
          sessionStorage.setItem("jwtToken", this.jwtResponse.token)


          //check the RoleId based on it redirect to respective component
          if (this.jwtResponse.rId == 1) {
            //logged As Admin
            console.log("ADMIN");
            //storing in local Storage / session Storage
            localStorage.setItem("username", this.jwtResponse.uname);
            localStorage.setItem("ACCESS_ROLE", this.jwtResponse.rId.toString());
            sessionStorage.setItem("username", this.jwtResponse.uname);
            this.router.navigateByUrl('/admin');
          }
          else if (this.jwtResponse.rId == 2) {
            //logged As Manager
            console.log("MANAGER");
            //storing in local Storage / session Storage
            localStorage.setItem("username", this.jwtResponse.uname);
            localStorage.setItem("ACCESS_ROLE", this.jwtResponse.rId.toString());
            sessionStorage.setItem("username", this.jwtResponse.uname);
            this.router.navigateByUrl('/manager');
          }
          else if (this.jwtResponse.rId == 3) {
            //logged As User
            console.log("USER");
            //storing in local Storage / session Storage
            localStorage.setItem("username", this.jwtResponse.uname);
            localStorage.setItem("ACCESS_ROLE", this.jwtResponse.rId.toString());
            sessionStorage.setItem("username", this.jwtResponse.uname);
            this.router.navigateByUrl('/employee');
          }
          else {
            this.error = "Sorry NOT allowed ... Invalid authorization "
          }

        },
          error => {
            this.error = "Invalid Username or Password. Try Again"
          }
        );

    }
    //#endregion

  }

  //login verify -- FOR TESTING ONLY
  loginVerifyTest() {
    if (this.loginForm.valid) {
      this.authService.getUserByPassword(this.loginForm.value)
        .subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/_service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'helpadmin';
  password = '';
  form: FormGroup;
  invalidLogin = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private loginservice: AuthenticationService) {
                this.form = new FormGroup({
                  username: new FormControl(''),
                  password: new FormControl(''),
                });
               }
  ngOnInit() {
  }

  checkLogin() {
    if (this.loginservice.authenticate(this.username, this.password)
    ) {
      this.router.navigate(['']);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}

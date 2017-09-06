import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LoginDTO} from '../../shared/dto/LoginDTO';
import {ToastsManager} from 'ng2-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastsManager,
              private vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  protected signIn(credentials) {
    this.authService.login(new LoginDTO(credentials.email, credentials.password))
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/']);
        }
      }, error => this.toastr.error('Invalid username or password!', 'Sign in error'));
  }

}

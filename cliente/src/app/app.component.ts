import { Component, OnInit } from '@angular/core';
import { GLOBAL } from './services/global';
import { Router, ActivatedRoute, Paramas } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})

export class AppComponent implements OnInit{
  public title = 'MUSIFY';
  public user: User;
  public user_register: User;
  public identity;
  public token;
  public errorMessage;
  public alertRegister
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ){
  	this.user = new User('', '', '', '', '', 'ROLE_USER','');
    this.user_register = new User('', '', '', '', '', 'ROLE_USER','');
    this.url = GLOBAL.url;
  }

  public ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  public onSubmit(){
  	console.log(this.user);
  	//Conseguir los datos del usuario logueado
  	this._userService.signup(this.user).subscribe(
  		response => {
  			let identity = response.user;
  			this.identity = identity;

  			if(!this.identity._id) {
  				alert("El usuario no está correctamente identificado");
  			} else {
  				//Crear elemento localstorage para tener al usuario sesión
          localStorage.setItem('identity', JSON.stringify(identity));
  				//Conseguir el token para enviarselo a cada petición http
  				this._userService.signup(this.user,'true').subscribe(
			  		response => {
			  			let token = response.token;
			  			this.token = token;

			  			if(this.token.length <= 0) {
			  				alert("El token no se ha generado correctamente");
			  			} else {
			  				//Crear elemento localstorage para tener token disponible
                localStorage.setItem('token', token);
                this.user = new User('', '', '', '', '', 'ROLE_USER','');
			  			}
			  			console.log(response);
			  		},
			  		error => {
			  			var errorMessage = <any>error;

			  			if(errorMessage != null){
			  				var body = JSON.parse(error._body);
			  				this.errorMessage = body.message;
			  				console.log(error);
			  			}
			  		}
			  	);
  			}
  			console.log(response);
  		},
  		error => {
  			var errorMessage = <any>error;

  			if(errorMessage != null){
  				var body = JSON.parse(error._body);
  				this.errorMessage = body.message;
  				console.log(error);
  			}
  		}
  	);
  }

  logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();

    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }

  public onSubmitRegister(){
    this._userServie.register(this.user_register).subscribe(
      response => {
        let user = response.user;
        this.user_register = user;

        if(!user._id){
          this.alertRegister = 'Error al registrarse';
        } else {
          this.alertRegister = 'El registro se ha realizado correctamente, identificate con ' + this.user_register.email;
          this.user_register = new User('', '', '', '', '', 'ROLE_USER','');
        }
      },
      error => {
        var errorMessage = <any>error;

        if(errorMessage != null){
          var body = JSON.parse(error._body);
          this.alertRegister = body.message;
          console.log(error);
        }
      }
    );
  }
}

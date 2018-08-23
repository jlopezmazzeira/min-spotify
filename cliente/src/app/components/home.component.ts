import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Paramas } from '@angular/core';

@Component({
	selector: 'home',
	templateUrl: '../views/home.html'
})

export class HomeComponent implements OnInit {
	public titulo: string;
	
	constructor(
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Artistas';
	}

	ngOnInit(){
		console.log('home.component.ts cargado');
	}
}
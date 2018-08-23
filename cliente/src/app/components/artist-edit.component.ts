import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Paramas } from '@angular/core';

import { GLOBAL } from '../services/global';
import { UploadService } from '../services/upload.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';

@Component({
	selector: 'artist-edit',
	templateUrl: '../views/artist-add.html',
	providers: [UserService, ArtistService]
})

export class ArtistEditComponent implements OnInit {
	public titulo: string;
	public artist: Artist;
	public identity;
	public token;
	public url: string;
	public alertMessage;
	public is_edit;
	public filesToUpload: Array<File>;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _userService: UserService,
		private _uploadService: UploadService,
		private _artistService: ArtistService
	){
		this.titulo = 'Editar Artista';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.artist = new Artist('','','');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('artist-edit.component.ts cargado');

		//Llamar al metodo del api para sacar un artista en base a su id getArtist
		this.getArtist();
	}

	getArtist(){
		this._route.params.forEach((params: Params) => {
			let id: params['id'];

			this._artistService.getArtist(this.token, id).subscribe(
				response => {
					if(!response.artist){
						this._router.navigate(['/']);
					} else {
						this.artist = response.artist;
					}
				},
				error => {
					var errorMessage = <any>error;

		  			if(errorMessage != null){
		  				var body = JSON.parse(error._body);
		  				this.alertMessage = body.message;
		  				console.log(error);
		  			}
				}
			);
		});
	}

	onSubmit(){
		this._route.params.forEach((params: Params) => {
			let id: params['id'];
			this._artistService.editArtist(this.token, this.artist).subscribe(
				response => {
					
					if(!response.artist){
						this.alertMessage = 'Error en el servidor';
					} else {
						this.alertMessage = '¡Artista actualizado correctamente!';
						if(!this.filesToUpload){
							//redirigir
							this._router.navigate(['/editar-artista',response.artist._id]);
							console.log(this.artist);
						} else {
							this._uploarService.makeFileRequest(this.url + 'upload-image-artist/'+ id, [], this.filesToUpload, this.token, 'image').then(
								(result) => {
									this._router.navigate(['/editar-artista',response.artist._id]);
								},
								(error) => {
									console.log(error);
								}
							);
							//this.artist = response.artist;
						}
					}
				},
				error => {
					var errorMessage = <any>error;

		  			if(errorMessage != null){
		  				var body = JSON.parse(error._body);
		  				this.alertMessage = body.message;
		  				console.log(error);
		  			}
				}
			);
		});
	}

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}
}
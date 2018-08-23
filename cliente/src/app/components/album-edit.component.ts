import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Paramas } from '@angular/core';

import { GLOBAL } from '../services/global';
import { AlbumService } from '../services/album.service';
import { UploadService } from '../services/upload.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
	selector: 'album-edit',
	templateUrl: '../views/album-add.html',
	providers: [UserService, AlbumService, UploadService]
})

export class AlbumAddComponent implements OnInit {
	public titulo: string;
	public artist: Artist;
	public album: Album;
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
		private _albumService: AlbumService
	){
		this.titulo = 'Editar album';
		this.identity = this._userService.getIdentity();
		this.token = this._userService.getToken();
		this.url = GLOBAL.url;
		this.album = new Album('', '', 2017, '', '');
		this.is_edit = true;
	}

	ngOnInit(){
		console.log('album-edit.component.ts cargado');
		getAlbum
	}

	getAlbum(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._albumService.getAlbum(this.token, id).subscribe(
				response => {
					if(!response.album){
						this._router.navigate(['/']);
					} else {
						this.album = response.album;
					}
				},
				error => {
					var errorMessage = <any>error;

		  			if(errorMessage != null){
		  				var body = JSON.parse(error._body);
		  				console.log(error);
		  			}
				}
			);
		});
	}

	onSubmit(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._albumService.addAlbum(this.token, id, this.album).subscribe(
				response => {
					if(!response.album){
						this.alertMessage = 'Error en el servidor';
					} else {
						this.alertMessage = '¡Album editado correctamente!';
						if(!this.filesToUpload){
							//redirigir
							console.log(response.album.artist);
						} else {
							this._uploarService.makeFileRequest(this.url + 'upload-image-album/'+ id, [], this.filesToUpload, this.token, 'image').then(
								(result) => {
									this._router.navigate(['/artista',response.album.artist]);
								},
								(error) => {
									console.log(error);
								}
							);
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
]
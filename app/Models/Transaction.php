<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
	protected $fillable = [
		'status',
		'price',
		'credits',
		'session_id',
		'user_id',
		'package_id'
	];

	public function user(){
		$this->belongsTo(User::class);
	}

	public function package(){
		$this->belongsTo(Package::class);
	}
}

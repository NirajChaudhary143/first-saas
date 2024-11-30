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
    	return $this->belongsTo(User::class, 'user_id', 'id');
	}

	public function package(){
		return $this->belongsTo(Package::class,'package_id','package_id');
	}
}

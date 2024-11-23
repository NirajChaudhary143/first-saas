<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsedFeature extends Model
{
    protected $fillable = [
		'credits',
		'feature_id',
		'user_id',
		'data'
	];

	public function feature(){
		$this->belongsTo(Feature::class);
	}

	public function user(){
		$this->belongsTo(User::class);
	}
}

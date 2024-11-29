<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{

	public ?Transaction $transaction = null;

	public function purchase(Package $package){
		dd($package);
	}
}

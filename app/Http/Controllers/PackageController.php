<?php

namespace App\Http\Controllers;

use App\Models\Package;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    public function index(){
		$package = Package::all();
		return inertia('Upgrade/Package', [
							'packages' => $package,
							'redirected' => session('redirected'),
							'message' => session('message')
						]);
	}
}

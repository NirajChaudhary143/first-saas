<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;

class Feature1Controller extends Controller
{
    public ?Feature $feature = null;

	public function __construct()
	{
		try {
            $this->feature = Feature::where("route_name", "feature1.index")
                                    ->where('active', true)
                                    ->firstOrFail();
        } catch (ModelNotFoundException $e) {
            abort(404, 'Feature not found');
        }
	}

	public function index()
	{
		return inertia('Features/Feature1', [
			'feature1' => new FeatureResource($this->feature),
			'answer' => session('answer'),
		]);
	}


}

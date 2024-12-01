<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use App\Models\UsedFeature;
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

	public function calculate(Request $request){
		$user = $request->user();

		if ($user['available_credits'] < $this->feature['required_credits']) {
			return to_route('purchase')->with([
				'redirected' => true,
				'message' => 'You are out of credits. Please purchase more credits from the available packages below.'
			]);
		}

		$validate = $request->validate([
			'first_value' => 'required|numeric',
			'second_value' => 'required|numeric'
		]);



		$first_value = $request->input('first_value');
		$second_value = $request->input('second_value');

		$user->decreaseCredits($this->feature['required_credits']);

		UsedFeature::create([
			'credits' => $this->feature['required_credits'],
			'feature_id' => $this->feature['id'],
			'user_id' => $user['id'],
			'data' => json_encode(array('first_value' => $first_value, 'second_value' => $second_value))
		]);
		$addition = $first_value + $second_value;

		return to_route('feature1.index')->with('answer',$addition);
	}
}

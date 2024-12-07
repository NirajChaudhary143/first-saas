<?php

namespace App\Http\Controllers;

use App\Models\Package;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use RemoteMerge\Esewa\Client;

class TransactionController extends Controller
{

	protected $esewa = "";

	public function __construct(){
		$successUrl = route('purchase.success', ['from', 'esewa']);
		$failureUrl = route('purchase.failed', ['from', 'esewa']);

		$this->esewa = new Client([
			'merchant_code' => 'EPAYTEST',
			'success_url' => $successUrl,
			'failure_url' => $failureUrl,
		]);
	}

	public function purchase(Request $request,Package $package){
		switch ( $request->payment_method ) {
			case 'esewa':
				Transaction::create([
					'package_id' => $package->package_id,
					'user_id' => Auth::user()->id,
					'price' => $package->price,
					'status' => 'Pending',
					'credits' => $package->credits,
					'session_id' => '123'
				]);
				$this->esewa->payment($package->package_id, $package->price, 0, 0.0, 0.0 );
				break;

				case 'stripe':
					$stripe = new \Stripe\StripeClient( env( 'STRIPE_SECRET_KEY' ) );

					$checkout_session = $stripe->checkout->sessions->create([
					'success_url' => route('purchase.success', ['from' => 'stripe']),
					'cancel_url' => route('purchase.failed', ['from' => 'stripe']),
						'line_items' => [
							[
								'price_data' => [
									'currency' => 'usd',
									'product_data' => [
										'name' => $package->name,
									],
									'unit_amount' => $package->price * 100,
								],
								'quantity' => 1,
							],
						],
						'mode' => 'payment',
					]);


					Transaction::create([
						'package_id' => $package->package_id,
						'user_id' => Auth::user()->id,
						'price' => $package->price,
						'status' => 'Pending',
						'credits' => $package->credits,
						'session_id' => $checkout_session->id
					]);
				return redirect($checkout_session->url);
				break;
			default:
				# code...
				break;
		}
	}

	public function success(){
		$payment_source = isset( $_GET['from'] ) ? $_GET['from'] : '';

		if( empty( $payment_source ) ){
			return;
		}
		switch ($payment_source) {
			case 'esewa':
				$order_id = $_GET['oid'];
				$amount = $_GET['amt'];
				$refference_id = $_GET['refId'];

				$status = $this->esewa->verifyPayment( $refference_id, $order_id, $amount);
				if ($status) {
					$transaction = Transaction::where('package_id', $order_id)->firstOrFail();
					$transaction->status = "Success";
					$transaction->save();

					$user = $transaction->user;

					$user->available_credits += $transaction->credits;
					$user->save();

					return inertia('Success',['source' =>ucfirst($payment_source)]);
				}
				break;

			case 'stripe':
				return inertia('Success',['source' => ucfirst($payment_source)]);

				break;
			default:
				# code...
				break;
		}
	}

	public function failed(){
		$payment_source = isset( $_GET['from'] ) ? sanitize_text_field( $_GET['from'] ) : '';

		if( empty( $payment_source ) ){
			return;
		}

		dd($_GET);
	}
}

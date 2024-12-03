<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsedFeatureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
			'id' => $this->id,
			'credits' => $this->credits,
			'feature' => new FeatureResource( $this->feature ),
			'data' => $this->data,
			'created_at' => $this->created_at
		];
    }
}

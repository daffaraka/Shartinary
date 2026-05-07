<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlaceResource extends JsonResource
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
            'name' => $this->name,
            'address' => $this->address,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'city_id' => $this->city_id,
            'category_id' => $this->category_id,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            // Relations
            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
                'icon' => $this->category?->icon,
                'color' => $this->category?->color,
            ],

            'tags' => $this->tags->map(function ($tag) {
                return [
                    'id' => $tag->id,
                    'name' => $tag->name,
                    'slug' => $tag->slug,
                ];
            }),

            'city' => [
                'id' => $this->city?->id,
                'name' => $this->city?->name,
                'slug' => $this->city?->slug,
                'latitude' => $this->city?->lat,
                'longitude' => $this->city?->lng,
                'province' => [
                    'id' => $this->city?->province?->id,
                    'name' => $this->city?->province?->name,
                    'slug' => $this->city?->province?->slug,
                    'country' => [
                        'id' => $this->city?->province?->country?->id,
                        'name' => $this->city?->province?->country?->name,
                        'slug' => $this->city?->province?->country?->slug,
                        'iso_code' => $this->city?->province?->country?->iso_code,
                    ],
                ],
            ],
        ];
    }
}

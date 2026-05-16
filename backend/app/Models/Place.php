<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name',
        'address',
        'latitude',
        'longitude',
        'city_id',
        'category_id',
        'price_range', // Medium / High
        'icon', // Icon default kalau belum ada foto
    ];


    protected $casts = [
        'latitude' => 'float',
        'longitude' => 'float',
    ];

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'place_tag');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = ['name', 'slug', 'iso_code'];

    public function provinces()
    {
        return $this->hasMany(Province::class);
    }

    public function places()
    {
        return $this->hasManyThrough(Place::class, City::class, 'province_id', 'city_id', 'id', 'id');
    }
}

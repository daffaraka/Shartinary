<?php

namespace App\Models;

use App\Models\City;
use App\Models\ItineraryDay;
use App\Models\ItineraryItem;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Itinerary extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'city_id',
        'parent_id', // Untuk fitur Fork (Base Itinerary)
        'title',
        'slug',
        'description',
        'duration_days',
        'total_budget',
        'is_public',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function city()
    {
        return $this->belongsTo(City::class);
    }

    public function days()
    {
        return $this->hasMany(ItineraryDay::class);
    }

    public function items()
    {
        return $this->hasManyThrough(ItineraryItem::class, ItineraryDay::class);
    }
}

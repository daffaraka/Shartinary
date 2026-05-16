<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItineraryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'itinerary_day_id',
        'place_id',
        'time_start',
        'time_end',
        'estimated_cost',
        'order', // Sangat penting untuk kalkulasi urutan dan jarak tempuh
        'note',
    ];

    public function day()
    {
        return $this->belongsTo(ItineraryDay::class, 'itinerary_day_id');
    }

    public function place()
    {
        return $this->belongsTo(Place::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipie extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'ingredients',
        'cooking_plan',
        'owner_email'
    ];
}

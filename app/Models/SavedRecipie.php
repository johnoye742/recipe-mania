<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SavedRecipie extends Model
{
    use HasFactory;
    protected $fillable = [
        'owner_email',
        'recipie_id'
    ];
}

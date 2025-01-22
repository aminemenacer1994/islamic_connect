<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TranslationAhmedRaza extends Model
{
 use HasFactory;

 protected $table = 'translation_ahmed_raza';

 protected $fillable = [
  'translation_ahmed_raza',
  'ayah_id'
 ];

 public function ayah()
 {
  return $this->belongsTo(Ayah::class, 'ayah_id', 'id');
 }
}

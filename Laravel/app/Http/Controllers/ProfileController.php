<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class ProfileController extends Controller
{
    public function updateUserData(Request $request)
{
    /** @var User $user */
    $user = Auth::user();

    $request->validate([
        'name' => 'sometimes|string|max:255',
        'profile_photo' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        'address' => 'sometimes|string|max:255',
        'google_maps_link' => 'sometimes|url|max:255',
        'birthdate' => 'sometimes|date',
        'gender' => 'sometimes|string|max:10',
    ]);

    if ($request->hasFile('profile_photo')) {
        if ($user->profile_photo) {
            Storage::delete('public/' . $user->profile_photo);
        }
        $profilePhotoPath = $request->file('profile_photo')->store('images/profile_photos', 'public');
        $user->profile_photo = $profilePhotoPath;
    }

    $user->name = $request->input('name', $user->name);
    $user->address = $request->input('address', $user->address);
    $user->google_maps_link = $request->input('google_maps_link', $user->google_maps_link);
    $user->birthdate = $request->input('birthdate', $user->birthdate);
    $user->gender = $request->input('gender', $user->gender);
    $user->save();

    return response()->json($user);
}
}


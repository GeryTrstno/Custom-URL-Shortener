<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Models\Link;
use Laravel\Fortify\Features;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // KONDISI 1: Jika User SUDAH Login
        if (auth()->check()) {
            // Ambil data link milik user (Logic Dashboard dipindah ke sini)
            $links = Link::where('user_id', auth()->id())
                        ->latest()
                        ->get();

            // Tampilkan halaman App/Shortener (Gabungan Form + Tabel)
            return Inertia::render('shortener', [
                'links' => $links
            ]);
        }

        // KONDISI 2: Jika User BELUM Login (Tamu)
        // Tampilkan Landing Page (Welcome.tsx)
        return Inertia::render('welcome', [
            'canRegister' => Features::enabled(Features::registration()),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    // POST
    public function store(StoreLinkRequest $request)
    {

        $validated = $request->validated();

        if ($validated['custom_alias'] ?? false) {
            $shortCode = $validated['custom_alias'];
        } else {
            do {
                $shortCode = Str::random(6);
            } while (Link::where('short_code', $shortCode)->exists());
        }

        $link = Link::create([
            'user_id' => auth()->id(),
            'original_url' => $validated['original_url'],
            'short_code' => $shortCode,
            'click_count' => 0
        ]);

        return back()->with('success', 'Link Shortened Successfully!')
            ->with('short_link', url($link->short_code));
    }

    /**
     * Display the specified resource.
     */
    public function show(Link $link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLinkRequest $request, Link $link)
    {
        $validated = $request->validated();

        abort_if($link->user_id !== auth()->id(), 403);

        if ($validated['custom_alias'] ?? false) {
            $shortCode = $validated['custom_alias'];
        } else {
            do {
                $shortCode = Str::random(6);
            } while (Link::where('short_code', $shortCode)->exists());
        }

        $link->update([
            'original_url' => $validated['original_url'],
            'short_code' => $shortCode,
        ]);

        return back()->with('success', 'Link Updated Successfully!')
            ->with('short_link', url($link->short_code));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {

        abort_if($link->user_id !== auth()->id(), 403);

        $link->delete();

        return back()->with('success', 'Link Deleted Successfully!');
    }

    public function shortenLink($code)
    {
        $link = Link::where('short_code', $code)->first();

        if (!$link) {
            abort(404);
        }

        $link->increment('click_count');

        return redirect($link->original_url);
    }
}

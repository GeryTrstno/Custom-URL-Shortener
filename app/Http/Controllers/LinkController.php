<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use App\Models\Link;
use Illuminate\Support\Str;
use Inertia\Inertia;

class LinkController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('shortener');
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

        $link = Link::create([
            'user_id' => auth()->id(),
            'original_url' => $validated['original_url'],
            'short_code' => Str::random(6),
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Link $link)
    {
        //
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

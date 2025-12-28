<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLinkRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'original_url' => 'required|url',
            'custom_alias' => 'nullable|alpha_dash|string|unique:links,short_code|max:20'
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'original_url.required' => 'The original URL is required.',
            'original_url.url' => 'The original URL must be a valid URL.',
            'custom_alias.unique' => 'The custom alias has already been taken.',
            'custom_alias.max' => 'The custom alias may not be greater than 20 characters.',
            'custom_alias.alpha_dash' => 'The custom alias may only contain letters, numbers, dashes, and underscores.',
        ];
    }
}

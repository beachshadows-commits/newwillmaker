'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  beneficiaries: z.string().min(10, 'List at least one beneficiary'),
  assets: z.string().min(20, 'Describe your assets'),
});

type FormData = z.infer<typeof schema>;

export default function WillForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-will', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSuccess(true);
    } catch (err) {
      alert('Something went wrong — try again');
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-300 rounded-xl p-12 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4">Will Generated & Emailed!</h2>
        <p className="text-lg">Check your inbox (and spam folder) for your PDF.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-2xl font-bold">Your Information</h2>

      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input {...register('fullName')} className="w-full px-4 py-3 border rounded-lg" placeholder="John Doe" />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input {...register('email')} type="email" className="w-full px-4 py-3 border rounded-lg" placeholder="you@example.com" />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Beneficiaries (one per line)</label>
        <textarea
          {...register('beneficiaries')}
          rows={5}
          className="w-full px-4 py-3 border rounded-lg"
          placeholder="Jane Doe - Daughter - 50%\nJohn Smith - Son - 50%"
        />
        {errors.beneficiaries && <p className="text-red-500 text-sm mt-1">{errors.beneficiaries.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Assets & Instructions</label>
        <textarea
          {...register('assets')}
          rows={7}
          className="w-full px-4 py-3 border rounded-lg"
          placeholder="My house at 123 Main St, bank accounts, car, personal belongings..."
        />
        {errors.assets && <p className="text-red-500 text-sm mt-1">{errors.assets.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-lg text-lg disabled:opacity-70"
      >
        {loading ? 'Generating Your Will...' : 'Generate My Will & Send PDF'}
      </button>
    </form>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GetChargesResponse, useCharges } from '@/hooks/use-charges';
import { Button } from '@/components';

export default function ChargesPage() {
  const { getCharges } = useCharges();
  const [charges, setCharges] = useState<GetChargesResponse>();
  const router = useRouter()

  useEffect(() => {
    getCharges().then(setCharges);
  }, []);

  return (
    <main className='flex flex-col h-screen justify-center max-w-[1100px] mx-auto gap-4'>
      <header className='px-6'>
        <h1 className='font-bold text-2xl leading-[160%]'>
          Minhas cobranças
        </h1>
      </header>

      <section className='bg-slate-900 p-6 rounded'>

      <h2>ENTRADA</h2>
      <ul>
        {charges?.chargesReceivable?.map(chargeReceivable => (
          <li key={chargeReceivable.id}>
            {chargeReceivable.description} - {chargeReceivable.amount}
          </li>
        ))}
      </ul>
    </section>

    <section className='bg-slate-900 p-6 rounded'> 
      <h2>SAÍDA</h2>
      <ul>
        {charges?.chargesPayable?.map(chargePayable => (
          <li key={chargePayable.id}>
            {chargePayable.description} - {chargePayable.amount}
          </li>
        ))}
      </ul>

      </section>

      <Button className='max-w-48' onClick={() => router.push('/charges/create')}>Gerar cobrança</Button>
    </main>
  );
}
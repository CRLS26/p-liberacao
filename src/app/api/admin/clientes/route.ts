import { NextResponse } from 'next/server';

const clientesAtivos = {
  '1': { nome: 'Cliente 1', primeiro_acesso: '2023-01-01', ultimo_acesso: '2023-01-10' },
  '2': { nome: 'Cliente 2', primeiro_acesso: '2023-01-05', ultimo_acesso: '2023-01-15' },
  // Adicione mais clientes conforme necessário
};

export async function GET() {
  return NextResponse.json(clientesAtivos);
}
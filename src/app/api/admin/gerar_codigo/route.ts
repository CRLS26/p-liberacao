import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { id_maquina, dias_validade } = await request.json();
    const codigoGerado = `COD-${Math.random().toString(36).substr(2, 9)}`; // Exemplo de geração de código

    // Aqui você pode adicionar lógica para armazenar o código gerado e a validade

    return NextResponse.json({ codigo: codigoGerado });
  } catch (error) {
    console.error('Erro ao gerar código:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
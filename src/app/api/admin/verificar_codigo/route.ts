import { NextResponse } from 'next/server';

const codigosLiberados: { [key: string]: { id_maquina: string; dias_validade: number } } = {
  // Exemplo de códigos liberados
  'COD-123456789': { id_maquina: '1', dias_validade: 90 },
  // Adicione mais códigos conforme necessário
};

export async function POST(request: Request) {
  try {
    const { codigo }: { codigo: string } = await request.json();

    if (codigosLiberados[codigo]) {
      return NextResponse.json({ success: true, message: 'Cliente liberado!' });
    } else {
      return NextResponse.json({ success: false, message: 'Código inválido.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
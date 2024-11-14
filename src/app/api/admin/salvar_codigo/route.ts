import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface CodigoInfo {
  id_maquina: string;
  dias_validade: number;
  data_geracao: string;
}

interface Codigos {
  [codigo: string]: CodigoInfo;
}

export async function POST(request: Request) {
  try {
    const { codigo, id_maquina, dias_validade } = await request.json();
    const filePath = path.join(process.cwd(), 'codigos.json');

    // Ler os códigos existentes
    let codigos: Codigos = {};
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      codigos = JSON.parse(data);
    }

    // Adicionar o novo código
    codigos[codigo] = { id_maquina, dias_validade, data_geracao: new Date().toISOString() };

    // Salvar os códigos de volta no arquivo
    fs.writeFileSync(filePath, JSON.stringify(codigos, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar código:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
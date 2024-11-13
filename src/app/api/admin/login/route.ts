import { NextResponse } from 'next/server'

const ADMIN_KEY = process.env.ADMIN_KEY

export async function POST(request: Request) {
  try {
    const adminKey = request.headers.get('X-Admin-Key')

    if (!adminKey || adminKey !== ADMIN_KEY) {
      return NextResponse.json(
        { error: 'Chave administrativa inválida' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no login:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
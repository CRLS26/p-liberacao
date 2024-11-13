// src/app/admin/validar_codigo/page.tsx
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ValidarCodigoPage() {
  const [codigo, setCodigo] = useState('')
  const [resultado, setResultado] = useState('')
  const router = useRouter()

  const validarCodigo = async () => {
    const response = await fetch('/api/admin/verificar_codigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': localStorage.getItem('adminKey') || ''
      },
      body: JSON.stringify({ codigo })
    })

    if (response.ok) {
      const data = await response.json()
      setResultado(data.message)
    } else {
      const errorData = await response.json()
      setResultado(errorData.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Validar Código</h1>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Código</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          onClick={validarCodigo}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Validar Código
        </button>
        {resultado && (
          <div className="mt-4">
            <p className="font-medium">{resultado}</p>
          </div>
        )}
      </div>
    </div>
  )
}
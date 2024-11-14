'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Cliente {
  nome: string
  primeiro_acesso: string
  ultimo_acesso: string
}

interface ClientesAtivos {
  [key: string]: Cliente
}

export default function DashboardPage() {
  const [clientes, setClientes] = useState<ClientesAtivos>({})
  const [diasValidade, setDiasValidade] = useState(90)
  const [selectedClient, setSelectedClient] = useState('')
  const [codigoGerado, setCodigoGerado] = useState('')
  const router = useRouter()

  useEffect(() => {
    carregarClientes()
  }, [])

  const carregarClientes = async () => {
    const adminKey = localStorage.getItem('adminKey')
    const response = await fetch('/api/admin/clientes', {
      headers: {
        'X-Admin-Key': adminKey || ''
      }
    })

    if (response.ok) {
      const data = await response.json()
      setClientes(data)
    } else {
      router.push('/admin/login')
    }
  }

  const gerarCodigo = async () => {
    if (!selectedClient) return;
  
    const response = await fetch('/api/admin/gerar_codigo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': localStorage.getItem('adminKey') || ''
      },
      body: JSON.stringify({
        id_maquina: selectedClient,
        dias_validade: diasValidade
      })
    });
  
    if (response.ok) {
      const data = await response.json();
      setCodigoGerado(data.codigo);
  
      // Armazenar o código gerado em um arquivo JSON
      await fetch('/api/admin/salvar_codigo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': localStorage.getItem('adminKey') || ''
        },
        body: JSON.stringify({
          codigo: data.codigo,
          id_maquina: selectedClient,
          dias_validade: diasValidade
        })
      });
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Painel de Controle</h1>
      
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Clientes Ativos</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            {Object.entries(clientes).map(([id, cliente]) => (
              <div
                key={id}
                onClick={() => setSelectedClient(id)}
                className={`p-2 cursor-pointer rounded ${
                  selectedClient === id ? 'bg-blue-100' : 'hover:bg-gray-100'
                }`}
              >
                <p className="font-medium">{cliente.nome}</p>
                <p className="text-sm text-gray-600">ID: {id}</p>
                <p className="text-sm text-gray-600">
                  Último acesso: {new Date(cliente.ultimo_acesso).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Gerar Código</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Dias de Validade</label>
              <input
                type="number"
                value={diasValidade}
                onChange={(e) => setDiasValidade(Number(e.target.value))}
                className="w-full p-2 border rounded"
                min="1"
                max="730"
              />
            </div>

            <button
              onClick={gerarCodigo}
              disabled={!selectedClient}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
              Gerar Código
            </button>

            {codigoGerado && (
              <div className="mt-4">
                <p className="font-medium">Código Gerado:</p>
                <p className="bg-gray-100 p-2 rounded mt-2">{codigoGerado}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [adminKey, setAdminKey] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        }
      })

      if (response.ok) {
        // Armazena a chave admin no localStorage para uso futuro
        localStorage.setItem('adminKey', adminKey)
        router.push('/admin/dashboard')
      } else {
        alert('Chave administrativa inválida')
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error)
      alert('Erro ao tentar fazer login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Painel Administrativo</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="adminKey" className="block text-sm font-medium text-gray-700 mb-2">
              Chave Administrativa
            </label>
            <input
              id="adminKey"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}
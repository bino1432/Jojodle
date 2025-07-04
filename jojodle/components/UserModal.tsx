'use client';

import { useEffect, useState } from 'react';

interface User {
  username: string;
  password: string;
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginOrRegister = () => {
    if (!username || !password) {
      alert('Preencha nome e senha!');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      const newUser = { username, password };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      alert('Usuário cadastrado!');
    } else {
      const parsed = JSON.parse(storedUser);
      if (parsed.username === username && parsed.password === password) {
        setUser(parsed);
        alert('Login bem-sucedido!');
      } else {
        alert('Usuário ou senha incorretos!');
      }
    }

    setUsername('');
    setPassword('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    alert('Logout realizado');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 text-xl"
        >
          &times;
        </button>

        {user ? (
          <div>
            <h2 className="text-xl mb-4">Perfil</h2>
            <p className="mb-4">Bem-vindo, <strong>{user.username}</strong>!</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded w-full"
            >
              Sair
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl mb-4">Login ou Cadastro</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Usuário"
              className="border p-2 mb-3 w-full rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="border p-2 mb-3 w-full rounded"
            />
            <button
              onClick={handleLoginOrRegister}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              Entrar / Cadastrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
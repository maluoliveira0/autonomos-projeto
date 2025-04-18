import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api';

export default function HomePage() {
  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [scheduledAt, setScheduledAt] = useState('');
  const [formData, setFormData] = useState({ title: '', description: '', category: '', price: '' });
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: '', password: '' });
  const [showMyServices, setShowMyServices] = useState(false);
  const [myBookedServices, setMyBookedServices] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    fetch(`${API_URL}/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setBookings(data));

    fetch(`${API_URL}/services`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setServices(data));
  }, [token, navigate]);

  const handleSearch = async () => {
    const res = await fetch(`${API_URL}/services/search?title=${encodeURIComponent(search)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setServices(data);
  };

  const fetchMyBookings = async () => {
    const res = await fetch(`${API_URL}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMyBookedServices(data);
  };

  const handleCreateService = async () => {
    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    });

    if (response.ok) {
      alert('Serviço criado com sucesso!');
      setShowServiceForm(false);
      setFormData({ title: '', description: '', category: '', price: '' });
    } else {
      alert('Erro ao criar serviço');
    }
  };

  const handleOpenBooking = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setShowBookingModal(true);
  };

  const handleBookService = async () => {
    if (!scheduledAt || !selectedServiceId) return;

    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ serviceId: selectedServiceId, scheduledAt }),
    });

    if (response.ok) {
      alert('Serviço agendado com sucesso!');
      setShowBookingModal(false);
      setScheduledAt('');
    } else {
      alert('Erro ao agendar serviço');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Bem-vindo!</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30"
        >
          Perfil
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white text-gray-900 p-6 rounded-lg w-full max-w-md">
            <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={() => setShowModal(false)}>✕</button>
            <h2 className="text-xl font-bold mb-4">Perfil do Usuário</h2>
            <div className="space-y-4">
            <button
              onClick={() => {
                setShowModal(false);
                setShowProfileForm(true);
              }}
              className="w-full bg-blue-500 text-white py-2 rounded-md"
            >
              Alterar dados do usuário
            </button>

            <button
              onClick={() => {
                setShowModal(false);
                setShowServiceForm(true);
              }}
              className="w-full bg-green-500 text-white py-2 rounded-md"
            >
              Cadastrar novo serviço
            </button>

            <button
              onClick={() => {
                fetchMyBookings().then(() => {
                setShowModal(false);
                setShowMyServices(true);
              });
              }}
              className="w-full bg-purple-500 text-white py-2 rounded-md"
            >
              Meus serviços
            </button>
            <button
              onClick={() => {
                const confirmLogout = confirm('Tem certeza que deseja sair da sua conta?');
                if (confirmLogout) {
                  localStorage.removeItem('token');
                  navigate('/');
                }
              }}
              className="w-full bg-red-500 text-white py-2 rounded-md"
            >
              Sair da conta
            </button>
            </div>
          </div>
        </div>
      )}

      {showServiceForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white text-gray-900 p-6 rounded-lg w-full max-w-md">
            <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={() => setShowServiceForm(false)}>✕</button>
            <h2 className="text-xl font-bold mb-4">Cadastrar Serviço</h2>
            <div className="space-y-4">
              <input className="w-full p-2 border rounded" placeholder="Título" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
              <textarea className="w-full p-2 border rounded" placeholder="Descrição" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              <input className="w-full p-2 border rounded" placeholder="Categoria" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
              <input className="w-full p-2 border rounded" placeholder="Preço" type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              <button onClick={handleCreateService} className="w-full bg-green-600 text-white py-2 rounded-md">Criar Serviço</button>
            </div>
          </div>
        </div>
      )}

      {showProfileForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white text-gray-900 p-6 rounded-lg w-full max-w-md">
            <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={() => setShowProfileForm(false)}>✕</button>
            <h2 className="text-xl font-bold mb-4">Alterar Perfil</h2>
            <div className="space-y-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Nome"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              />
              <input
                className="w-full p-2 border rounded"
                placeholder="Nova Senha"
                type="password"
                value={profileForm.password}
                onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
              />
              <button
                onClick={async () => {
                  const res = await fetch(`${API_URL}/users/me`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(profileForm),
                  });
                  if (res.ok) {
                    alert('Perfil atualizado com sucesso');
                    setShowProfileForm(false);
                  } else {
                    alert('Erro ao atualizar perfil');
                  }
                }}
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {showMyServices && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white text-gray-900 p-6 rounded-lg w-full max-w-xl max-h-[80vh] overflow-auto">
            <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={() => setShowMyServices(false)}>✕</button>
            <h2 className="text-xl font-bold mb-4">Agendamentos Recebidos</h2>
            {myBookedServices.length === 0 ? (
              <p>Nenhum agendamento encontrado.</p>
            ) : (
              myBookedServices.map((b: any) => (
                <div key={b.id} className="mb-4 p-4 border rounded">
                  <p><strong>Cliente:</strong> {b.user.name}</p>
                  <p><strong>Serviço:</strong> {b.service.title}</p>
                  <p><strong>Agendado para:</strong> {new Date(b.scheduledAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {b.status}</p>
                  {b.status === 'pending' && (
                    <button
                      className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                      onClick={async () => {
                        const res = await fetch(`${API_URL}/bookings/${b.id}/status`, {
                          method: 'PUT',
                          headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                          },
                          body: JSON.stringify({ status: 'confirmed' }), // ← status atualizado aqui
                        });
                        if (res.ok) {
                          alert('Agendamento confirmado.');
                          fetchMyBookings(); // recarrega os agendamentos após confirmar
                        } else {
                          alert('Erro ao confirmar agendamento.');
                        }
                      }}
                    >
                      Confirmar Agendamento
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}


      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white text-gray-900 p-6 rounded-lg w-full max-w-md">
            <button className="absolute top-4 right-4 text-gray-600 text-lg" onClick={() => setShowBookingModal(false)}>✕</button>
            <h2 className="text-xl font-bold mb-4">Agendar Serviço</h2>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded mb-4"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
            />
            <button
              onClick={handleBookService}
              className="w-full bg-blue-600 text-white py-2 rounded-md"
            >
              Confirmar Agendamento
            </button>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-white">Serviços Agendados</h2>
      <div className="overflow-x-auto whitespace-nowrap mb-10">
        {bookings.length === 0 ? (
          <p className="text-white/80">Você não possui nenhum serviço agendado.</p>
        ) : (
          bookings.map((booking: any) => (
            <div key={booking.id} className="inline-block bg-white/20 text-white p-4 m-2 rounded-md shadow-md min-w-[200px]">
              <p className="font-bold">{booking.service?.title || 'Serviço removido'}</p>
              <p>{new Date(booking.scheduledAt).toLocaleString()}</p>
              <p className="text-sm">Profissional: {booking.service?.user?.name || 'Desconhecido'}</p>
              <span className={`mt-2 inline-block px-2 py-1 rounded text-sm font-semibold
                ${booking.status === 'pending' ? 'bg-yellow-500' :
                  booking.status === 'confirmed' ? 'bg-green-500' :
                  booking.status === 'accepted' ? 'bg-blue-500' :
                  booking.status === 'canceled' ? 'bg-red-500' : 'bg-gray-500'}
              `}>
                {booking.status.toUpperCase()}
              </span>
            </div>
          ))
        )}
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-white">Serviços Recentes</h2>
      <div className="flex mb-4 mt-6">
        <input
          type="text"
          className="flex-1 p-3 rounded-l-md bg-white/20 text-white placeholder-white/60 focus:outline-none"
          placeholder="Buscar serviços por título..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-r-md"
        >
          Buscar
        </button>
      </div>
      <div className="grid gap-4">
        {services.map((service: any) => (
          <div key={service.id} className="bg-white/20 text-white p-4 rounded-md shadow-md flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p>{service.description}</p>
              <p className="text-sm mt-2">Profissional: {service.user?.name}</p>
            </div>
            <button
              onClick={() => handleOpenBooking(service.id)}
              className="ml-4 mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md self-start"
            >
              Agendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
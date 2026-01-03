import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { predictionService, Prediction } from '../../services/predictionService';
import { PredictionForm } from '../components/Admin/PredictionForm';
import { UserList } from '../components/Admin/UserList';
import {
    Trophy,
    Plus,
    Search,
    Edit2,
    Trash2,
    TrendingUp,
    Database,
    Users,
    Activity,
    Settings,
    LogOut
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
    const { user, signOut } = useAuth();
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedPrediction, setSelectedPrediction] = useState<Prediction | undefined>(undefined);
    const [activeTab, setActiveTab] = useState<'palpites' | 'usuarios'>('palpites');

    useEffect(() => {
        fetchPredictions();
    }, []);

    const fetchPredictions = async () => {
        try {
            setLoading(true);
            const data = await predictionService.getAll();
            setPredictions(data);
        } catch (error) {
            console.error('Error fetching predictions:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleNewPalpite = () => {
        setSelectedPrediction(undefined);
        setIsFormOpen(true);
    };

    const handleEdit = (prediction: Prediction) => {
        setSelectedPrediction(prediction);
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Tem certeza que deseja excluir este palpite?')) return;
        try {
            await predictionService.delete(id);
            setPredictions(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting prediction:', error);
        }
    };

    const handleFormSuccess = () => {
        setIsFormOpen(false);
        fetchPredictions();
    };

    const filteredPredictions = predictions.filter(p =>
        p.match_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.league.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-200">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-800 bg-slate-900/50 p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-10 px-2 cursor-pointer group" onClick={() => setActiveTab('palpites')}>
                    <div className="p-2 bg-[#00FF88] rounded-xl group-hover:rotate-12 transition-transform shadow-lg shadow-[#00FF88]/20">
                        <Trophy className="w-6 h-6 text-slate-950" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-extrabold text-lg text-white leading-tight">CENTRAL</span>
                        <span className="text-[10px] font-bold text-[#00FF88] uppercase tracking-[0.3em]">do Palpite</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Principal</p>
                    <button
                        onClick={() => setActiveTab('palpites')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${activeTab === 'palpites'
                            ? 'bg-[#00FF88]/10 text-[#00FF88]'
                            : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                    >
                        <Database className="w-5 h-5" />
                        Palpites
                    </button>
                    <button
                        onClick={() => setActiveTab('usuarios')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left font-medium ${activeTab === 'usuarios'
                            ? 'bg-[#00FF88]/10 text-[#00FF88]'
                            : 'hover:bg-slate-800 text-slate-400 hover:text-white'
                            }`}
                    >
                        <Users className="w-5 h-5" />
                        Usuários
                    </button>
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-[#00FF88] font-bold border border-slate-700 shadow-inner">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-medium truncate">{user?.email?.split('@')[0]}</span>
                            <span className="text-[10px] text-[#00FF88] font-bold uppercase tracking-widest">Master Admin</span>
                        </div>
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-all font-medium"
                    >
                        <LogOut className="w-5 h-5" />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {activeTab === 'palpites' ? (
                    <>
                        {/* Header Palpites */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h1 className="text-3xl font-bold mb-1">Painel de Palpites</h1>
                                <p className="text-slate-400">Gerencie todos os palpites ativos e encerrados</p>
                            </div>
                            <button
                                onClick={handleNewPalpite}
                                className="flex items-center justify-center gap-2 bg-[#00FF88] hover:bg-[#00DD77] text-slate-950 font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-[#00FF88]/20 group"
                            >
                                <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Novo Palpite
                            </button>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-[#00FF88]/10 text-[#00FF88]">
                                        <Trophy className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Total de Palpites</p>
                                        <p className="text-2xl font-bold">{predictions.length}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-400">Pendentes</p>
                                        <p className="text-2xl font-bold">{predictions.filter(p => p.status === 'pending').length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search and Table */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Database className="w-5 h-5 text-slate-400" />
                                    Lista de Palpites
                                </h2>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Buscar partida ou liga..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-slate-800/50 border border-slate-700 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-[#00FF88] transition-all w-64"
                                    />
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-slate-900/80 text-slate-400 text-sm font-medium uppercase tracking-wider">
                                            <th className="px-6 py-4">Partida</th>
                                            <th className="px-6 py-4">Liga</th>
                                            <th className="px-6 py-4">Data</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {loading ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                    Carregando palpites...
                                                </td>
                                            </tr>
                                        ) : filteredPredictions.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                                    Nenhum palpite encontrado.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredPredictions.map((prediction) => (
                                                <tr key={prediction.id} className="hover:bg-slate-800/30 transition-colors group">
                                                    <td className="px-6 py-4">
                                                        <div className="font-semibold text-slate-200">{prediction.match_name}</div>
                                                        <div className="text-xs text-slate-500">{prediction.prediction_type}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-medium border border-slate-700">
                                                            {prediction.league}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-slate-400">
                                                        {new Date(prediction.match_date).toLocaleDateString('pt-BR')}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${prediction.status === 'won' ? 'bg-green-500/10 text-green-400' :
                                                            prediction.status === 'lost' ? 'bg-red-500/10 text-red-400' :
                                                                prediction.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                                                                    'bg-slate-800 text-slate-400'
                                                            }`}>
                                                            {prediction.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => handleEdit(prediction)}
                                                                className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-all transition-opacity"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => prediction.id && handleDelete(prediction.id)}
                                                                className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-400 transition-all transition-opacity"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    <UserList />
                )}
            </main>

            {/* Modal de Formulário */}
            {isFormOpen && (
                <PredictionForm
                    prediction={selectedPrediction}
                    onClose={() => setIsFormOpen(false)}
                    onSuccess={handleFormSuccess}
                />
            )}
        </div>
    );
};

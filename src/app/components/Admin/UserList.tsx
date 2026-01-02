import React, { useState, useEffect } from 'react';
import { profileService, Profile } from '../../../services/profileService';
import {
    Users,
    Search,
    Shield,
    ShieldOff,
    User as UserIcon,
    Mail,
    MoreVertical,
    CheckCircle2,
    XCircle
} from 'lucide-react';

export const UserList: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            setLoading(true);
            const data = await profileService.getAll();
            setProfiles(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAdmin = async (profile: Profile) => {
        const action = profile.is_admin ? 'remover' : 'tornar';
        if (!window.confirm(`Deseja realmente ${action} as permissões de admin de ${profile.full_name || 'este usuário'}?`)) return;

        try {
            await profileService.update(profile.id, { is_admin: !profile.is_admin });
            setProfiles(prev => prev.map(p => p.id === profile.id ? { ...p, is_admin: !p.is_admin } : p));
        } catch (error) {
            console.error('Error updating admin status:', error);
            alert('Erro ao atualizar status de administrador.');
        }
    };

    const filteredProfiles = profiles.filter(p =>
    (p.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.username?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Users className="w-5 h-5 text-slate-400" />
                    Gerenciamento de Usuários
                </h2>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Buscar usuário..."
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
                            <th className="px-6 py-4">Usuário</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Última Atividade</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    Carregando usuários...
                                </td>
                            </tr>
                        ) : filteredProfiles.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        ) : (
                            filteredProfiles.map((p) => (
                                <tr key={p.id} className="hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold border border-slate-700">
                                                {p.avatar_url ? (
                                                    <img src={p.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                                                ) : (
                                                    <UserIcon className="w-5 h-5" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-200">{p.full_name || 'Sem Nome'}</div>
                                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                                    @{p.username || p.id.slice(0, 8)}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${p.is_admin ? 'bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/20' : 'bg-slate-800 text-slate-500 border border-slate-700'
                                                }`}>
                                                {p.is_admin ? 'Administrador' : 'Cliente'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {p.updated_at ? new Date(p.updated_at).toLocaleDateString('pt-BR') : 'Sem dados'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => toggleAdmin(p)}
                                                className={`p-2 rounded-lg transition-all flex items-center gap-2 text-xs font-semibold ${p.is_admin
                                                        ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                                                        : 'bg-[#00FF88]/10 text-[#00FF88] hover:bg-[#00FF88]/20'
                                                    }`}
                                                title={p.is_admin ? "Remover Admin" : "Tornar Admin"}
                                            >
                                                {p.is_admin ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                                                {p.is_admin ? 'Revogar Admin' : 'Dar Admin'}
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
    );
};

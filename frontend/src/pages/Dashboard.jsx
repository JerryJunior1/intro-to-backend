import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import CreatePersonaDialog from '../components/CreatePersonaDialog';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Trash2, Pencil, LogOut, User } from "lucide-react"
import { toast } from "sonner"

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [personas, setPersonas] = useState([]);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchPersonas = async () => {
        try {
            const response = await api.get('/posts/getPosts');
            setPersonas(response.data);
        } catch (error) {
            toast.error("Failed to fetch personas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPersonas();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this persona?")) return;
        try {
            await api.delete(`/posts/delete/${id}`);
            toast.success("Persona deleted");
            fetchPersonas();
        } catch (error) {
            toast.error("Failed to delete persona");
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
            {/* Sidebar (Simple) */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:block p-6">
                <div className="flex items-center gap-2 mb-8">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">P</div>
                    <h1 className="text-xl font-bold tracking-tight">Persona</h1>
                </div>
                <nav className="space-y-2">
                    <Button variant="secondary" className="w-full justify-start">
                        <User className="mr-2 h-4 w-4" /> Dashboard
                    </Button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {/* Top Bar */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                        <p className="text-slate-400">Manage your profiles and identities.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src="/avatars/01.png" alt={user?.username} />
                                        <AvatarFallback>{user?.username?.[0]?.toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none">{user?.username}</p>
                                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Action Bar */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">All Personas</h3>
                    <Button onClick={() => setIsCreateOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" /> Add New
                    </Button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : personas.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-slate-800 rounded-lg">
                        <p className="text-slate-500">No personas found. Create one to get started.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {personas.map((persona) => (
                            <Card key={persona._id} className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <div className="font-bold text-lg">{persona.name}</div>
                                    <Badge variant="secondary">{persona.age} years</Badge>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-slate-400 line-clamp-3">
                                        {persona.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end gap-2">
                                    <Button variant="outline" size="icon" className="h-8 w-8">
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="h-8 w-8"
                                        onClick={() => handleDelete(persona._id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <CreatePersonaDialog 
                open={isCreateOpen} 
                onOpenChange={setIsCreateOpen} 
                onPersonaCreated={fetchPersonas}
            />
        </div>
    );
};

export default Dashboard;

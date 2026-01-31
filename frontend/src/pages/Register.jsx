import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(username, email, password);
        if (result.success) {
            toast.success("Account created successfully!");
            navigate('/login');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-950">
             <Card className="w-[350px] border-slate-800 bg-slate-900/50 text-slate-100">
                <CardHeader>
                    <CardTitle>Create an Account</CardTitle>
                    <CardDescription>Join Persona to manage your profiles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                             <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input 
                                    id="username" 
                                    placeholder="jdoe" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="bg-slate-950 border-slate-800"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input 
                                    id="email" 
                                    placeholder="name@example.com" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-slate-950 border-slate-800"
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-slate-950 border-slate-800"
                                    required
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-6" type="submit">Sign Up</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-slate-400">
                        Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Register;

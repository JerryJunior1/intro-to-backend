import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import api from "../api/axios";
import { toast } from "sonner";

const CreatePersonaDialog = ({ open, onOpenChange, onPersonaCreated }) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/posts/create', { name, age: Number(age), description });
            toast.success("Persona created successfully");
            onPersonaCreated();
            onOpenChange(false);
            // Reset form
            setName('');
            setAge('');
            setDescription('');
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create persona");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800 text-slate-100">
                <DialogHeader>
                    <DialogTitle>Create New Persona</DialogTitle>
                    <DialogDescription>
                        Fill in the details below to publish a new profile.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                className="col-span-3 bg-slate-950 border-slate-800" 
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="age" className="text-right">Age</Label>
                            <Input 
                                id="age" 
                                type="number" 
                                value={age} 
                                onChange={(e) => setAge(e.target.value)} 
                                className="col-span-3 bg-slate-950 border-slate-800" 
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Bio</Label>
                            <Textarea 
                                id="description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                className="col-span-3 bg-slate-950 border-slate-800"
                                required 
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Identity'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePersonaDialog;

'use client';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Hash } from 'lucide-react';

export function PokemonSortMenu() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    // Default to number sorting (mockup default)
    const currentSort = searchParams.get('sort') || 'id_asc';
    const [open, setOpen] = useState(false);

    // Map complex sort keys to simple "Number" vs "Name" options for the radio group logic
    const getSortType = (sort: string) => sort.startsWith('name') ? 'name' : 'number';
    const [sortType, setSortType] = useState(getSortType(currentSort));

    const handleSortChange = (value: string) => {
        setSortType(value);
        // Determine exact sort param. Mockup implies strictly "Number" vs "Name".
        const newSortParam = value === 'number' ? 'id_asc' : 'name_asc';

        const params = new URLSearchParams(searchParams);
        params.set('sort', newSortParam);
        replace(`${pathname}?${params.toString()}`);
        setOpen(false);
    };

    useEffect(() => {
        setSortType(getSortType(currentSort));
    }, [currentSort]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-[#dc0a2d] p-0 shadow-sm"
                    variant="ghost"
                >
                    {sortType === 'name' ? (
                        <span className="text-xl font-bold leading-none underline decoration-2 underline-offset-2">A</span>
                    ) : (
                        <Hash className="h-6 w-6" />
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[300px] p-0 rounded-3xl overflow-hidden border-none gap-0">
                <DialogHeader className="bg-[#a81622] p-6 text-white text-center">
                    <DialogTitle className="text-2xl font-bold">Sort by:</DialogTitle>
                </DialogHeader>

                <div className="bg-white p-6">
                    <RadioGroup value={sortType} onValueChange={handleSortChange} className="gap-4">
                        <div className="flex items-center space-x-2 bg-white rounded-xl p-3 shadow-sm border border-transparent data-[state=checked]:border-[#dc0a2d]">
                            <div className="relative flex items-center">
                                <RadioGroupItem value="number" id="sort-number" className="peer sr-only" />
                                <div className="w-5 h-5 rounded-full border-2 border-[#dc0a2d] peer-data-[state=checked]:bg-white flex items-center justify-center">
                                    {sortType === 'number' && <div className="w-2.5 h-2.5 rounded-full bg-[#dc0a2d]" />}
                                </div>
                            </div>
                            <Label htmlFor="sort-number" className="text-xl flex-1 cursor-pointer">Number</Label>
                        </div>

                        <div className="flex items-center space-x-2 bg-white rounded-xl p-3 shadow-sm border border-transparent data-[state=checked]:border-[#dc0a2d]">
                            <div className="relative flex items-center">
                                <RadioGroupItem value="name" id="sort-name" className="peer sr-only" />
                                <div className="w-5 h-5 rounded-full border-2 border-[#dc0a2d] peer-data-[state=checked]:bg-white flex items-center justify-center">
                                    {sortType === 'name' && <div className="w-2.5 h-2.5 rounded-full bg-[#dc0a2d]" />}
                                </div>
                            </div>
                            <Label htmlFor="sort-name" className="text-xl flex-1 cursor-pointer">Name</Label>
                        </div>
                    </RadioGroup>
                </div>
            </DialogContent>
        </Dialog>
    );
}

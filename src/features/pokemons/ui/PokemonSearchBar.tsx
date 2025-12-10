'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback, useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

export function PokemonSearchBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [term, setTerm] = useState(searchParams.get('q')?.toString() || '');
    const debouncedTerm = useDebounce(term, 300);

    const handleSearch = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams);
            if (term) {
                params.set('q', term);
            } else {
                params.delete('q');
            }
            replace(`${pathname}?${params.toString()}`);
        },
        [searchParams, pathname, replace]
    );

    useEffect(() => {
        handleSearch(debouncedTerm);
    }, [debouncedTerm, handleSearch]);

    return (
        <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#dc0a2d]" />
            <Input
                type="search"
                placeholder="Search"
                className="w-full h-12 pl-12 pr-4 bg-white rounded-full border-none shadow-sm text-gray-700 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
            />
        </div>
    );
}

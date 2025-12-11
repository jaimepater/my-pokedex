import { NextResponse } from 'next/server';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = searchParams.get('offset') || '0';
  const limit = searchParams.get('limit') || '20';

  try {
    // 1. Fetch the list
    const listRes = await fetch(
      `${BASE_URL}/pokemon?offset=${offset}&limit=${limit}`
    );

    if (!listRes.ok) {
      throw new Error(`PokeAPI list fetch failed: ${listRes.statusText}`);
    }

    const listData = await listRes.json();

    const detailedResults = await Promise.all(
      listData.results.map(async (item: { url: string }) => {
        const detailRes = await fetch(item.url);
        if (!detailRes.ok) return null;
        return detailRes.json();
      })
    );

    const validResults = detailedResults.filter((r) => r !== null);

    return NextResponse.json({
      ...listData,
      results: validResults,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch pokemon data' },
      { status: 500 }
    );
  }
}

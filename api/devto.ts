import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = req.headers['x-api-key'] as string;

  if (!apiKey) {
    return res.status(401).json({ error: 'Dev.to API key required' });
  }

  try {
    const { title, body_markdown, published, tags, description } = req.body;

    const response = await fetch('https://dev.to/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
      body: JSON.stringify({
        article: {
          title,
          body_markdown,
          published: published || false,
          tags: tags || [],
          description: description || '',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error || 'Failed to create article on Dev.to'
      });
    }

    return res.status(200).json({
      success: true,
      url: data.url,
      id: data.id,
      slug: data.slug,
    });
  } catch (error) {
    console.error('Dev.to API error:', error);
    return res.status(500).json({
      error: 'Failed to connect to Dev.to API'
    });
  }
}

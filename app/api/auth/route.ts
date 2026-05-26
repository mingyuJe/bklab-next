import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/auth — initiates GitHub OAuth flow.
 * Redirects the user to GitHub's authorization page.
 *
 * Env vars required:
 *   GITHUB_CLIENT_ID
 */
export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return new NextResponse('GITHUB_CLIENT_ID not configured', { status: 500 });
  }

  const url = req.nextUrl;
  const host = req.headers.get('host') || url.host;
  const proto = req.headers.get('x-forwarded-proto') || 'https';
  const redirectUri = `${proto}://${host}/api/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
  });

  return NextResponse.redirect(`https://github.com/login/oauth/authorize?${params}`);
}

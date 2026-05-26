import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/callback — handles GitHub OAuth callback.
 * Exchanges the code for an access token, then renders an HTML page
 * that posts the token back to the Decap CMS opener window.
 *
 * Env vars required:
 *   GITHUB_CLIENT_ID
 *   GITHUB_CLIENT_SECRET
 */
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) {
    return new NextResponse('Missing code', { status: 400 });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse('OAuth env vars not configured', { status: 500 });
  }

  // Exchange code for access token
  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;

  if (!accessToken) {
    const body = renderPage('error', tokenData);
    return new NextResponse(body, {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const body = renderPage('success', {
    token: accessToken,
    provider: 'github',
  });

  return new NextResponse(body, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

function renderPage(status: 'success' | 'error', payload: unknown): string {
  // Decap CMS listens for a postMessage from the popup with this format:
  // "authorization:github:success:{token:...}"  or  ":error:{...}"
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Authorizing…</title></head>
<body>
  <p>Authorizing with GitHub…</p>
  <script>
    (function() {
      function receiveMessage(e) {
        // origin check is loose because Decap posts from same origin
        window.opener && window.opener.postMessage(
          ${JSON.stringify(message)},
          e.origin
        );
      }
      window.addEventListener("message", receiveMessage, false);
      // tell the opener we're ready, then immediately post the result
      window.opener && window.opener.postMessage("authorizing:github", "*");
    })();
  </script>
</body>
</html>`;
}

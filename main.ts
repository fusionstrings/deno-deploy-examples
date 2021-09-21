async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);

  // This is how the proxy works:
  // 1. A request comes in for a specific asset.
  // 2. We construct a URL to that asset.
  // 3. We fetch the asset and respond to the request.

  // Check if the request is for style.css.
  if (pathname.startsWith("/css")) {
    //  Construct a new URL to style.css by using the URL
    //  of the script (mod.ts) as base (import.meta.url).
    const style = new URL(`.${pathname}`, import.meta.url);
    // Fetch the asset and return the fetched response
    // to the client.
    const response = await fetch(style);
    // Set the appropriate content-type header value.
    response.headers.set("content-type", "text/css; charset=utf-8");
    // Return the response with modified content-type header.
    return response;
  }

  return new Response(
    `<html>
      <head>
        <link rel="stylesheet" href="css/style.css" />
      </head>
      <body>
        <h1>Deno Deploy Dev Container</h1>
        <main>
        style: ${style} <br>
        Pathname: ${pathname}<br> 
        import.meta.url: ${import.meta.url}<br> 
        headers: ${JSON.stringify(Object.fromEntries(request.headers), null, 2)}
        </main>
      </body>
    </html>`,
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
      },
    },
  );
}

//addEventListener("fetch", (event: FetchEvent) => {
  //event.respondWith(handleRequest(event.request));
//});

addEventListener("fetch", async (event) => {
	const file = await Deno.readFile(new URL("README.md", import.meta.url););
	event.respondWith(
		fetch(file),
	);
});


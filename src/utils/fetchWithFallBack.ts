export async function fetchWithFallback(urls: string[]): Promise<string> {
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Fetch failed: ${response.statusText}`);

      if (url.includes("allorigins")) {
        const { contents } = await response.json();
        return contents;
      } else {
        return await response.text();
      }
    } catch (error) {
      console.warn(`Fetching from ${url} failed. Trying next...`, error);
    }
  }
  throw new Error("모든 프록시 서버 요청이 실패했습니다.");
}

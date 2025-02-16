export function ImagePreLoading(urls: string[]) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

export function xmlToJson(xml: string): any {
  const parser = new DOMParser();
  const xmlString = parser.parseFromString(xml, "text/xml");

  function xmlToJsonRecursion(node: Element): any {
    const object: any = {};

    for (const child of Array.from(node.children)) {
      const childName = child.tagName;

      const childValue =
        child.children.length > 0
          ? xmlToJsonRecursion(child)
          : child.textContent?.trim() || "";

      if (object[childName]) {
        if (!Array.isArray(object[childName])) {
          object[childName] = [object[childName]];
        }
        object[childName].push(childValue);
      } else {
        object[childName] = childValue;
      }
    }
    return object;
  }
  return xmlToJsonRecursion(xmlString.documentElement);
}

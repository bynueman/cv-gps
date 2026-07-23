import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes rich-text HTML from the admin editor before it's stored —
 * defense in depth even though only the single admin account can write
 * this content (it's rendered back out via dangerouslySetInnerHTML on
 * public pages, so stripping scripts/handlers here is cheap insurance).
 */
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "em", "s", "h2", "h3", "ul", "ol", "li", "blockquote", "a", "img"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer", target: "_blank" }),
    },
  });
}

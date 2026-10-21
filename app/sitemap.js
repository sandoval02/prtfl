import { site } from './site';

export const dynamic = 'force-static';
export default function sitemap() {
  return [{ url: site.url, lastModified: new Date() }];
}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

const STEAM_STORE = 'https://store.steampowered.com';
const STEAM_API = 'https://api.steampowered.com';

@Injectable()
export class GamesService {
  // Cache simple in-memory đểไม่ spam Steam API
  private cache = new Map<string, { data: any; ts: number }>();
  private CACHE_TTL = 5 * 60 * 1000; // 5 minutes

  private async cachedGet(url: string, params?: Record<string, any>): Promise<any> {
    const key = url + JSON.stringify(params || {});
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.ts < this.CACHE_TTL) {
      return cached.data;
    }
    try {
      const res = await axios.get(url, {
        params,
        headers: { 'Accept-Language': 'en-US,en;q=0.9' },
        timeout: 10000,
      });
      this.cache.set(key, { data: res.data, ts: Date.now() });
      return res.data;
    } catch (err) {
      throw new HttpException('Steam API error', HttpStatus.BAD_GATEWAY);
    }
  }

  async getFeatured() {
    const data = await this.cachedGet(`${STEAM_STORE}/api/featured/`);
    const items = [
      ...(data?.large_capsules || []),
      ...(data?.featured_win || []).slice(0, 12),
    ];
    return items.slice(0, 16).map(this.mapFeaturedItem);
  }

  async getFeaturedCategories() {
    const data = await this.cachedGet(`${STEAM_STORE}/api/featuredcategories/`);
    const result: any = {};

    if (data?.top_sellers?.items) {
      result.topSellers = data.top_sellers.items.slice(0, 10).map(this.mapFeaturedItem);
    }
    if (data?.new_releases?.items) {
      result.newReleases = data.new_releases.items.slice(0, 10).map(this.mapFeaturedItem);
    }
    if (data?.specials?.items) {
      result.specials = data.specials.items.slice(0, 10).map(this.mapFeaturedItem);
    }
    return result;
  }

  async search(query: string) {
    const data = await this.cachedGet(`${STEAM_STORE}/api/storesearch/`, {
      term: query,
      l: 'english',
      cc: 'TH',
    });
    const items = data?.items || [];
    return items.slice(0, 20).map((item: any) => ({
      appid: item.id,
      name: item.name,
      headerImage: `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
      currentPrice: item.price?.final ? item.price.final / 100 : 0,
      originalPrice: item.price?.initial ? item.price.initial / 100 : 0,
      discountPercent: item.price?.discount_percent || 0,
      isFree: item.price?.final === 0,
      platforms: item.platforms,
    }));
  }

  async getAppDetail(appid: number) {
    const data = await this.cachedGet(`${STEAM_STORE}/api/appdetails`, {
      appids: appid,
      cc: 'th',
      l: 'english',
    });

    const appData = data?.[String(appid)];
    if (!appData?.success) {
      throw new HttpException('Game not found', HttpStatus.NOT_FOUND);
    }

    const d = appData.data;
    return {
      appid: d.steam_appid,
      name: d.name,
      headerImage: d.header_image,
      shortDescription: d.short_description,
      detailedDescription: d.detailed_description,
      genres: (d.genres || []).map((g: any) => g.description),
      categories: (d.categories || []).map((c: any) => c.description),
      developer: (d.developers || [])[0] || '',
      publisher: (d.publishers || [])[0] || '',
      releaseDate: d.release_date?.date || '',
      currentPrice: d.price_overview?.final ? d.price_overview.final / 100 : 0,
      originalPrice: d.price_overview?.initial ? d.price_overview.initial / 100 : 0,
      discountPercent: d.price_overview?.discount_percent || 0,
      isFree: d.is_free,
      currency: d.price_overview?.currency || 'THB',
      screenshots: (d.screenshots || []).slice(0, 5).map((s: any) => s.path_full),
      movies: (d.movies || []).slice(0, 2).map((m: any) => ({
        name: m.name,
        thumbnail: m.thumbnail,
        webm: m.webm?.['480'],
      })),
      metacritic: d.metacritic?.score || null,
      recommendations: d.recommendations?.total || 0,
      tags: Object.keys(d.tags || {}).slice(0, 8),
    };
  }

  async getCurrentPrice(appid: number): Promise<{ price: number; discountPercent: number } | null> {
    try {
      const data = await axios.get(`${STEAM_STORE}/api/appdetails`, {
        params: { appids: appid, cc: 'th', filters: 'price_overview' },
        timeout: 8000,
      });
      const appData = data.data?.[String(appid)];
      if (!appData?.success) return null;
      const po = appData.data?.price_overview;
      if (!po) return null;
      return {
        price: po.final / 100,
        discountPercent: po.discount_percent,
      };
    } catch {
      return null;
    }
  }

  private mapFeaturedItem(item: any) {
    return {
      appid: item.id,
      name: item.name,
      headerImage:
        item.large_capsule_image ||
        item.small_capsule_image ||
        `https://cdn.akamai.steamstatic.com/steam/apps/${item.id}/header.jpg`,
      currentPrice: item.final_price ? item.final_price / 100 : 0,
      originalPrice: item.original_price ? item.original_price / 100 : 0,
      discountPercent: item.discount_percent || 0,
      isFree: item.final_price === 0,
    };
  }

  isSteamSale(): { isSale: boolean; saleName: string | null } {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    // Summer Sale (late June - early July)
    if ((month === 6 && day >= 25) || (month === 7 && day <= 10)) {
      return { isSale: true, saleName: 'Steam Summer Sale 🌊' };
    }
    // Winter Sale (late Dec - early Jan)
    if ((month === 12 && day >= 19) || (month === 1 && day <= 5)) {
      return { isSale: true, saleName: 'Steam Winter Sale ❄️' };
    }
    // Autumn Sale (late Nov)
    if (month === 11 && day >= 20 && day <= 30) {
      return { isSale: true, saleName: 'Steam Autumn Sale 🍂' };
    }
    // Spring Sale (late Mar)
    if (month === 3 && day >= 20 && day <= 31) {
      return { isSale: true, saleName: 'Steam Spring Sale 🌸' };
    }
    return { isSale: false, saleName: null };
  }
}

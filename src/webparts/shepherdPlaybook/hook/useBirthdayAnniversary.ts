import { useEffect, useState } from "react";
import { config } from "../config";

export interface BirthdayItem {
  ID: number;
  Title: string;
  FileRef: string;
  ThumbnailUrl: string;
  Categories: string[];
}

export function useBirthdayAnniversary() {
  const [items, setItems] = useState<BirthdayItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      try {
        const apiUrl = `${config.siteUrl}/_api/web/lists/getbytitle('${config.sitePageDirectory}')/items?$select=ID,Title,FileRef,Created,BannerImageUrl,Author/Title,${config.categoryName}&$expand=Author&$filter=PromotedState eq 2&$orderby=Created ${config.newsOrder}`;
        const res = await fetch(apiUrl, {
          headers: { Accept: "application/json;odata=verbose" },
        });
        const json = await res.json();
        const results = json.d.results;

        const filtered = results
          .map((item: any) => ({
            ID: item.ID,
            Title: item.Title,
            FileRef: item.FileRef,
            ThumbnailUrl:
              item.BannerImageUrl?.Url || "./assets/img/update/default.png",
            Categories: item.Category?.results || [item.Category] || [],
          }))
          .filter((item: any) =>
            item.Categories.some((cat: string) =>
              config.birthdayAnniversary.includes(cat)
            )
          );

        setItems(filtered);
      } catch (error) {
        console.error("Error fetching birthday/anniversary items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading };
}

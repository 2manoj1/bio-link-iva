import { getPageCopy } from "@/lib/page-copy";
import Image from "next/image";
import { fetchContent } from "@/sanity/fetch";
import { Container, SectionHeader } from "./luxury-ui";

type Video = {
  _id: string;
  title: string;
  url: string;
  platform: string;
  image?: string;
  description?: string;
  views?: string;
  popular?: boolean;
  order?: number;
};
export async function SocialVideos() {
  const copy = await getPageCopy("SocialVideos");

  const videos = await fetchContent<Video[]>(
    `*[_type=="socialVideo" && hidden!=true && defined(url) && dateTime(publishedAt)<=dateTime(now())] | order(publishedAt desc){
    _id,title,url,platform,description,views,popular,order,"image":coalesce(thumbnail.asset->url,image)
  }`,
    {},
    [],
  );
  if (!videos.length) return null;
  const groups = [
    { title: copy("t_dabb1f53cd"), videos: videos.slice(0, 6) },
    {
      title: copy("t_56377aa346"),
      videos: videos
        .filter((video) => video.popular)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .slice(0, 6),
    },
  ];
  return (
    <section className="py-[var(--spacing-editorial-breath)]">
      <Container>
        {groups
          .filter((group) => group.videos.length)
          .map((group) => (
            <div key={group.title} className="mb-12">
              <SectionHeader
                eyebrow={copy("t_3f9f12ab75")}
                title={group.title}
              />
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.videos.map((video) => (
                  <article
                    key={video._id}
                    className="overflow-hidden rounded-md border border-[var(--border-soft)] bg-[var(--surface)]"
                  >
                    {video.image && (
                      <div className="relative aspect-[4/5]">
                        <Image
                          src={video.image}
                          alt={video.title}
                          fill
                          sizes="(min-width:1024px) 33vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs uppercase tracking-widest text-[var(--gold)]">
                        {video.platform}
                        {video.views ? ` · ${video.views} views` : ""}
                      </p>
                      <h3 className="mt-3 font-serif text-3xl">
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className="mt-3 text-sm leading-7">
                          {video.description}
                        </p>
                      )}
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm underline"
                      >
                        {copy("t_79ccc37a66")}
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
      </Container>
    </section>
  );
}

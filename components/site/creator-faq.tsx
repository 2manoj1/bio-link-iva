import { getCreatorIdentity } from '@/lib/creator-identity';
import { canonicalUrl, creatorFaqs } from '@/lib/creator-discovery';
import { JsonLd } from './json-ld';
import { Container } from './luxury-ui';

export async function CreatorFaq() {
  const creator = await getCreatorIdentity();
  const faqs = creatorFaqs(creator);
  return <section className="py-[var(--spacing-editorial-section)]">
    <Container className="max-w-4xl">
      <h2 className="font-serif text-4xl text-[var(--text-strong)]">About {creator.name}</h2>
      <dl className="mt-8 space-y-6">
        {faqs.map(faq => <div key={faq.question}>
          <dt className="font-semibold text-[var(--text-strong)]">{faq.question}</dt>
          <dd className="mt-2 text-base leading-8 text-[var(--text-body)]">{faq.answer}</dd>
        </div>)}
      </dl>
      <JsonLd data={{
        '@context':'https://schema.org','@type':'FAQPage','@id':`${canonicalUrl(creator,'/about')}#webpage`,
        url:canonicalUrl(creator,'/about'),name:`About ${creator.name}`,
        isPartOf:{'@id':`${canonicalUrl(creator)}#website`},about:{'@id':`${canonicalUrl(creator)}#person`},
        mainEntity:faqs.map(faq=>({'@type':'Question',name:faq.question,acceptedAnswer:{'@type':'Answer',text:faq.answer}})),
      }} />
    </Container>
  </section>;
}

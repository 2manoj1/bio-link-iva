import { defineArrayMember, defineField, type FieldDefinition } from 'sanity';

const titleFor = (name: string) => name.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase());
// Maps the existing structured content to named Studio fields without changing its shape.
export function contentField(name: string, value: unknown): FieldDefinition {
  const title = titleFor(name);
  if (Array.isArray(value)) {
    const sample = value[0];
    return defineField({ name, title, type: 'array', of: [
      sample && typeof sample === 'object'
        ? defineArrayMember({ name: name + 'Item', type: 'object', fields: Object.entries(sample).filter(([key]) => !key.startsWith('_')).map(([key,v]) => contentField(key,v)) })
        : defineArrayMember({ type: typeof sample === 'number' ? 'number' : 'string' }),
    ] });
  }
  if (value && typeof value === 'object') return defineField({
    name, title, type: 'object', options: { collapsible: true },
    fields: Object.entries(value).filter(([key]) => !key.startsWith('_')).map(([key,v]) => contentField(key,v)),
  });
  if (typeof value === 'number') return defineField({ name, title, type: 'number' });
  const text = typeof value === 'string' && value.length > 100;
  return defineField({ name, title, type: text ? 'text' : 'string', ...(text ? { rows: 3 } : {}),
    description: /image/i.test(name) ? 'Use a site image path or a Sanity CDN image URL.' : undefined,
    validation: rule => rule.required(),
  });
}

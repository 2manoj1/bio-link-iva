import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";

function Heading2(props: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="scroll-mt-28 pt-6 font-serif text-4xl font-medium leading-[1.02] text-[var(--text-strong)] md:text-5xl"
      {...props}
    />
  );
}

function Heading3(props: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="scroll-mt-28 pt-4 font-serif text-3xl font-medium leading-tight text-[var(--champagne)]"
      {...props}
    />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="text-lg leading-9 text-[var(--text-body)] md:text-xl md:leading-10"
      {...props}
    />
  );
}

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className="text-[var(--champagne)] underline decoration-[var(--gold)]/45 underline-offset-4 transition hover:text-[var(--gold)]"
      {...props}
    />
  );
}

function List(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="space-y-3 pl-5 text-lg leading-8 text-[var(--text-body)] marker:text-[var(--gold)]"
      {...props}
    />
  );
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="space-y-3 pl-5 text-lg leading-8 text-[var(--text-body)] marker:font-serif marker:text-[var(--gold)]"
      {...props}
    />
  );
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="my-10 border-l border-[var(--gold)]/70 pl-6 font-serif text-3xl italic leading-tight text-[var(--champagne)] md:text-4xl"
      {...props}
    />
  );
}

function HorizontalRule(props: ComponentPropsWithoutRef<"hr">) {
  return <hr className="my-12 border-[var(--border-soft)]" {...props} />;
}

const components = {
  a: Anchor,
  blockquote: Blockquote,
  h2: Heading2,
  h3: Heading3,
  hr: HorizontalRule,
  ol: OrderedList,
  p: Paragraph,
  ul: List,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return {
    ...components,
  };
}

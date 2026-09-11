type SectionHeadingProps = {
  /** セクション要素の aria-labelledby から参照される id */
  id: string;
  title: string;
  description: string;
};

export function SectionHeading({ id, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-16 text-center">
      <h2 id={id} className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <p className="mx-auto max-w-3xl text-lg text-brand-200 sm:text-xl">{description}</p>
    </div>
  );
}

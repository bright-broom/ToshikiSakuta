// =============================
// src/components/ui/SectionHeading.js
// セクション見出し
// =============================

/**
 * @param {Object} props
 * @param {string} props.title - 見出し
 * @param {string} props.description - 見出し下の説明文
 */
export default function SectionHeading({ title, description }) {
  return (
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="max-w-3xl mx-auto text-lg sm:text-xl text-[#bfdbfe]">{description}</p>
    </div>
  );
}

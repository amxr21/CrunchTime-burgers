export default function PriceTag({ price }: { price: string }) {
  return (
    <span className="absolute bottom-0 right-0 rounded-sm leading-6 bg-brand-red text-brand-white shrink-0 font-display px-2 pt-2 pb-1 text-2xl items-center justify-center flex sm:px-4 sm:pt-3 sm:pb-2 sm:text-4xl">{price}</span>
  );
}

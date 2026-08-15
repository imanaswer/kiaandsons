import { ArrowButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center text-bone">
      <p className="font-display text-[22vw] leading-none text-bone/10 md:text-[16rem]">404</p>
      <h1 className="font-display -mt-8 text-3xl tracking-tight md:text-5xl">
        This page hasn&apos;t been built.
      </h1>
      <p className="mt-4 max-w-sm text-stone">
        The page you&apos;re looking for doesn&apos;t exist — but the one you want us to
        build might.
      </p>
      <div className="mt-8">
        <ArrowButton href="/" tone="bone" variant="solid" cursor="Home">
          Back to Home
        </ArrowButton>
      </div>
    </section>
  );
}

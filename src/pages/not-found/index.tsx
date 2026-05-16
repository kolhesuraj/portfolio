import { useRouter } from "@/routes/hooks";
import Button from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="absolute left-1/2 top-1/2 mb-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-center">
      <span className="bg-gradient-to-b from-primary to-secondary bg-clip-text text-[10rem] font-extrabold leading-none text-transparent">
        404
      </span>
      <h2 className="font-heading my-2 text-2xl font-bold text-gray-700">
        Something&apos;s missing
      </h2>
      <p className="mt-3 text-sm text-gray-600">
        Sorry, the page you are looking for doesn&apos;t exist or has been
        moved.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          className="bg-ternary hover:bg-ternary/80"
          onClick={() => router.back()}
          variant="default"
          size={"lg"}>
          Go back
        </Button>
        <Button onClick={() => router.push("/")} variant="outline" size={"lg"}>
          Back to Home
        </Button>
      </div>
    </div>
  );
}

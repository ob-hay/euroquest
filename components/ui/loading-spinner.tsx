import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Image
            src="/assets/images/loader-logo.svg"
            alt="Loading"
            width={80}
            height={89}
            className="animate-pulse"
            unoptimized
          />
          <div className="absolute inset-0 animate-ping">
            <Image
              src="/assets/images/loader-logo.svg"
              alt=""
              width={80}
              height={89}
              className="opacity-30"
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}

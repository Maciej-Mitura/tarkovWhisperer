import Link from "next/link";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";

type ButtonLinkProps = Omit<ComponentProps<typeof Button>, "render" | "nativeButton"> & {
  href: string;
};

/** Link styled as a button. Uses nativeButton={false} so Base UI accepts a non-<button> render target. */
export function ButtonLink({ href, ...props }: ButtonLinkProps) {
  return (
    <Button nativeButton={false} render={<Link href={href} />} {...props} />
  );
}

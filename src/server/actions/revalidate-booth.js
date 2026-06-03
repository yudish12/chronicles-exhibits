"use server";

import { revalidatePath } from "next/cache";
import { withTrailingSlash } from "@/utils/portfolio-pages";

/**
 * Revalidates booth size list + detail pages (app routes and public rewrite URLs).
 * Pass previousSizeName / previousBoothCode when edit changes size or booth code.
 */
export async function revalidateBoothPages({
  sizeName,
  boothCode,
  previousSizeName,
  previousBoothCode,
}) {
  const newSize = sizeName?.toLowerCase();
  const newCode = boothCode;
  const oldSize = previousSizeName?.toLowerCase();
  const oldCode = previousBoothCode;

  await revalidatePath("/booth/size/[booth_size]/[booth_code]", "page");
  await revalidatePath("/booth/size/[booth_size]", "page");

  const sizeSet = new Set([newSize, oldSize].filter(Boolean));

  for (const size of sizeSet) {
    await revalidatePath(withTrailingSlash(`/booth/size/${size}`));
    await revalidatePath(withTrailingSlash(`/${size}-trade-show-booth`));
  }

  const detailEntries = [{ size: newSize, code: newCode }];
  if (
    oldSize &&
    oldCode &&
    (oldSize !== newSize || oldCode !== newCode)
  ) {
    detailEntries.push({ size: oldSize, code: oldCode });
  }

  for (const { size, code } of detailEntries) {
    if (!size || !code) continue;
    await revalidatePath(withTrailingSlash(`/booth/size/${size}/${code}`));
    await revalidatePath(
      withTrailingSlash(`/${size}-trade-show-booth/${code}`),
    );
  }
}

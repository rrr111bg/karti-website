"use client";

/* PHOTO-SLOT: gereserveerde plek voor de toekomstige editorial shoot
   van Nasra. Vervang dit paneel door een next/image zodra de echte
   fotografie er is; het data-attribuut markeert de plek en de specs.
   Tot die tijd oogt het als een bewust Dusty-Rose paneel met velvet
   en een gouden kader, zodat niets onaf voelt. */
export function PhotoSlot({
  id,
  spec,
  className = "",
}: {
  id: string;
  /** bijv. "staand 4:5, min 1600px breed" */
  spec: string;
  className?: string;
}) {
  return (
    <div
      data-photo-slot={id}
      data-photo-spec={spec}
      aria-hidden
      className={`photo-slot overflow-clip ${className}`}
    >
      <div className="velvet-texture" />
      <div aria-hidden className="absolute inset-3 border border-[#c9a854]/40 pointer-events-none" />
      <span className="photo-slot-mark">K A R T I</span>
    </div>
  );
}

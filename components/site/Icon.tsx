import { ICON_SPRITE, type IconName } from "../shared/icon-sprite.generated";

/** One of the app's icons (design/icons), drawn from the sprite that IconSprite puts in the page once. */
export function Icon({
  name,
  solid = false,
  className = "",
}: {
  name: IconName;
  solid?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`i${solid ? " solid" : ""}${className ? ` ${className}` : ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <use href={`#i-${name}`} />
    </svg>
  );
}

export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: ICON_SPRITE }}
    />
  );
}

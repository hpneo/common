import clsx from "clsx";

function EmptyState({ rootClassName, title, supportingText, button }) {
  return (
    <article class={clsx("empty-state", rootClassName)}>
      <div class="max-w-sm">
        <h3 class="empty-state-title">{title}</h3>
        {supportingText ? (
          <p class="empty-state-text">{supportingText}</p>
        ) : null}
        {button ? <div class="flex justify-center mt-6">{button}</div> : null}
      </div>
    </article>
  );
}

export default EmptyState;

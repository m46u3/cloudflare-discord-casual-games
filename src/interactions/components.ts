export interface Button {
  type: 2;
  style: 1 | 2 | 3 | 4 | 5;
  label: string;
  custom_id: string;
  emoji?: { name: string };
}

export function button(
  label: string,
  customId: string,
  style: 1 | 2 | 3 | 4 | 5 = 1,
  emoji?: string
): Button {
  return {
    type: 2,
    style,
    label,
    custom_id: customId,
    ...(emoji ? { emoji: { name: emoji } } : {})
  };
}

export function row(...buttons: Button[]) {
  return { type: 1, components: buttons };
}

export function response(content: string, components: unknown[] = []) {
  return { type: 4, data: { content, components } };
}

export function ephemeral(content: string) {
  return { type: 4, data: { content, flags: 64 } };
}

import type { KeyboardEvent, PointerEvent } from 'react';
import { KeyboardSensor, PointerSensor } from '@dnd-kit/core';

const IGNORE_TAGS = ['BUTTON'];

// Block Dnd, if IGNORE_TAGS includes elements tag or element has data-no-dnd attribute
const customHandleEvent = (element: HTMLElement | null) => {
  let cur = element;

  while (cur) {
    if (IGNORE_TAGS.includes(cur.tagName) || cur.dataset.noDnd === 'true') {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

PointerSensor.activators = [
  {
    eventName: 'onPointerDown',
    handler: ({ nativeEvent: event }: PointerEvent) =>
      customHandleEvent(event.target as HTMLElement),
  },
];

KeyboardSensor.activators = [
  {
    eventName: 'onKeyDown',
    handler: ({ nativeEvent: event }: KeyboardEvent) =>
      customHandleEvent(event.target as HTMLElement),
  },
];

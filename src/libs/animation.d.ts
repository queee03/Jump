declare namespace Animation {
  type EasingEnum = Tween.EasingEnum;

  type ToType = (
    duration: unknown,
    from: unknown,
    to: unknown,
    type: unknown
  ) => void;

  type TweenAnimationType = (
    from: unknown,
    to: number,
    duration: number,
    type: EasingEnum,
    callback: (to: number, isEnd?: boolean) => void
  ) => void;

  type CustomAnimationType = {
    to?: ToType;
  };
}

declare namespace AnimationTypes {
  type EasingEnum = TweenTypes.EasingEnum;

  type PositionKeyEnum = "x" | "y" | "z";

  type PositionType = Record<PositionKeyEnum, number>;

  type callbackType = (to?: number, isEnd?: boolean) => void;

  type ToType = (
    from: PositionType,
    to: PositionType,
    duration?: number,
    type?: EasingEnum,
    delay?: number
  ) => void;

  type TweenAnimationType = (
    from: number,
    to: number,
    duration?: number,
    type?: EasingEnum,
    callback?: callbackType
  ) => void;

  type CustomAnimationType = {
    to: ToType;
  };
}

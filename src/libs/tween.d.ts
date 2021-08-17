declare namespace Tween {
  type EasingEnum = "Linear";

  type TweenFunctionType = () => void;

  type TweenType = Record<EasingEnum, TweenFunctionType>;
}

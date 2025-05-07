
type ButtonProps = object

declare module "remoteApp/Button" {
    import { ComponentType } from "react";
    const Button: ComponentType<ButtonProps>;
    export default Button;
}

declare module "remoteApp/store" {
    type SetStateAction<S> = S | ((prevState: S) => S);
    type Dispatch<A> = (value: A) => void;

    // Assuming useStore returns a state value and setter function similar to React's useState
    const useStore: () => [number, Dispatch<SetStateAction<number>>];
    export default useStore;
}
import { makeInstaller } from "@raptor-element/utils";
import components from "./components";
import '@raptor-element/theme/index.css';

const installer = makeInstaller(components);

export * from "@raptor-element/components";
export default installer;
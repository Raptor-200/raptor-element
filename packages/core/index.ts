import { makeInstaller } from "@raptor-element/utils";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import components from "./components";
import printLogo from "./printLogo";
import '@raptor-element/theme/index.css';

printLogo()

library.add(fas);
const installer = makeInstaller(components);

export * from "@raptor-element/components";
export default installer;
import React from "react";
import useDarkMode from "use-dark-mode";
import { Button } from "./standardStyles.js";

export default function DarkModeToggle() {
    const darkMode = useDarkMode(false);

    return (
        <div>
            <Button tiny type="button" onClick={darkMode.disable}>
                ☀
            </Button>
            <Button tiny type="button" onClick={darkMode.enable}>
                ☾
            </Button>
        </div>
    );
}

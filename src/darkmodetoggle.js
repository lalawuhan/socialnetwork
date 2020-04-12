import React from "react";
import useDarkMode from "use-dark-mode";

export default function DarkModeToggle() {
    const darkMode = useDarkMode(false);

    return (
        <div>
            <button type="button" onClick={darkMode.disable}>
                ☀
            </button>
            <button type="button" onClick={darkMode.enable}>
                ☾
            </button>
        </div>
    );
}

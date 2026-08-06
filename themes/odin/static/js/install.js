window.addEventListener("DOMContentLoaded", () => {
    const tabs = [...document.querySelectorAll("[data-install-tab]")];
    const panels = [...document.querySelectorAll("[data-install-panel]")];
    const buildCommands = [...document.querySelectorAll("[data-install-build]")];
    const status = document.querySelector("#install-platform-status");

    if (tabs.length === 0 || panels.length === 0) return;

    const activate = (platform, focus = false) => {
        const tab = tabs.find(item => item.dataset.installTab === platform);
        if (!tab) return;

        tabs.forEach(item => {
            const selected = item === tab;
            item.setAttribute("aria-selected", String(selected));
            item.tabIndex = selected ? 0 : -1;
        });
        panels.forEach(panel => { panel.hidden = panel.dataset.installPanel !== platform; });
        buildCommands.forEach(command => { command.hidden = command.dataset.installBuild !== platform; });
        if (status) status.textContent = `Showing instructions for ${tab.textContent.trim()}.`;
        if (focus) tab.focus();
    };

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => activate(tab.dataset.installTab));
        tab.addEventListener("keydown", event => {
            if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
            event.preventDefault();
            const targetIndex = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length;
            activate(tabs[targetIndex].dataset.installTab, true);
        });
    });

    const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || navigator.userAgent;
    if (/win/i.test(platform)) activate("windows");
    else if (/mac/i.test(platform)) activate("macos");
    else if (/linux|x11|unix|bsd/i.test(platform)) activate("unix");

    document.querySelectorAll("[data-copy-command]").forEach(button => {
        button.addEventListener("click", async () => {
            const code = button.parentElement.querySelector("code");
            if (!code) return;
            try { await navigator.clipboard.writeText(code.innerText); }
            catch (_) {
                const selection = window.getSelection();
                const range = document.createRange();
                range.selectNodeContents(code);
                selection.removeAllRanges();
                selection.addRange(range);
                document.execCommand("copy");
                selection.removeAllRanges();
            }
            const label = button.querySelector(".copy-label");
            if (!label) return;
            label.textContent = "Copied";
            window.setTimeout(() => { label.textContent = "Copy"; }, 1800);
        });
    });
});

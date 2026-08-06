window.addEventListener("DOMContentLoaded", () => {
    const source = "https://odinbinaries.thisdrunkdane.io/file/odin-binaries/nightly.json";
    const initialGroupCount = 7;
    const list = document.querySelector("#nightly-build-list");
    const status = document.querySelector("#nightly-build-status");
    if (!list || !status) return;

    const element = (name, className, text) => {
        const node = document.createElement(name);
        if (className) node.className = className;
        if (text) node.textContent = text;
        return node;
    };

    const formatSize = bytes => {
        if (!Number.isFinite(bytes) || bytes < 0) return "—";
        if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
        return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    };

    const platform = name => {
        const file = name.toLowerCase();
        if (file.includes("windows")) return "Windows";
        if (file.includes("macos") || file.includes("darwin")) return "macOS";
        if (file.includes("freebsd")) return "FreeBSD";
        if (file.includes("netbsd")) return "NetBSD";
        if (file.includes("openbsd")) return "OpenBSD";
        if (file.includes("linux")) return "Linux";
        return "Other";
    };

    const downloadUrl = value => {
        if (typeof value !== "string") return null;
        try {
            const url = new URL(value);
            return url.protocol === "https:" ? url.href : null;
        } catch (_) {
            return null;
        }
    };

    const copyHash = async button => {
        const value = button.dataset.hash;
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
        } catch (_) {
            const temporary = document.createElement("textarea");
            temporary.value = value;
            temporary.style.position = "fixed";
            temporary.style.opacity = "0";
            document.body.appendChild(temporary);
            temporary.select();
            document.execCommand("copy");
            temporary.remove();
        }
        button.textContent = "Copied";
        window.setTimeout(() => { button.textContent = "Copy"; }, 1800);
    };

    const makeRow = build => {
        const row = document.createElement("tr");
        const platformCell = element("td", "nightly-platform-cell");
        platformCell.append(element("span", "nightly-platform", platform(build.name || "")));
        row.append(platformCell);

        const archiveCell = element("td", "nightly-archive-cell");
        const link = element("a", "nightly-download-link", build.name || "Download archive");
        const url = downloadUrl(build.url);
        if (url) {
            link.href = url;
            link.setAttribute("download", "");
        } else {
            link.removeAttribute("href");
            link.setAttribute("aria-disabled", "true");
        }
        archiveCell.append(link);
        row.append(archiveCell);

        row.append(element("td", "nightly-size", formatSize(Number(build.sizeInBytes))));

        const hashCell = element("td", "nightly-hash-cell");
        if (typeof build.sha1 === "string" && /^[a-f0-9]{40}$/i.test(build.sha1)) {
            const hashContent = element("div", "nightly-hash-content");
            hashContent.append(element("code", "nightly-hash", build.sha1));
            const copy = element("button", "nightly-copy", "Copy");
            copy.type = "button";
            copy.dataset.hash = build.sha1;
            copy.setAttribute("aria-label", `Copy SHA-1 for ${build.name || "archive"}`);
            copy.addEventListener("click", () => copyHash(copy));
            hashContent.append(copy);
            hashCell.append(hashContent);
        } else {
            hashCell.append(element("span", "nightly-no-hash", "Unavailable"));
        }
        row.append(hashCell);
        return row;
    };

    const makeRelease = (date, builds, latest) => {
        const release = element("section", "nightly-release");
        release.setAttribute("aria-label", `Nightly builds from ${date}`);
        const heading = element("header", "nightly-release-heading");
        const titleGroup = element("div", "nightly-release-title");
        const title = element("h3", "nightly-release-date", date);
        titleGroup.append(title);
        if (latest) titleGroup.append(element("span", "nightly-latest", "Latest"));
        heading.append(titleGroup);
        heading.append(element("span", "nightly-file-count", `${builds.length} ${builds.length === 1 ? "archive" : "archives"}`));
        release.append(heading);

        const tableWrap = element("div", "nightly-table-wrap");
        const table = element("table", "nightly-table");
        const head = document.createElement("thead");
        const headerRow = document.createElement("tr");
        ["Platform", "Archive", "Size", "SHA-1"].forEach(label => headerRow.append(element("th", "", label)));
        head.append(headerRow);
        table.append(head);
        const body = document.createElement("tbody");
        builds.forEach(build => body.append(makeRow(build)));
        table.append(body);
        tableWrap.append(table);
        release.append(tableWrap);
        return release;
    };

    const showError = () => {
        list.replaceChildren();
        const error = element("div", "nightly-error");
        error.append(element("strong", "", "The nightly list is unavailable right now."));
        error.append(element("p", "", "Please try again shortly, or use the tagged releases while the archive service catches up."));
        const link = element("a", "action-link secondary-action", "Browse tagged releases");
        link.href = "https://github.com/odin-lang/Odin/releases";
        error.append(link);
        list.append(error);
        status.textContent = "Could not load nightly builds";
    };

    fetch(source)
        .then(response => {
            if (!response.ok) throw new Error("Nightly build request failed");
            return response.json();
        })
        .then(data => {
            if (!data || typeof data.files !== "object") throw new Error("Nightly build data is invalid");
            const groups = Object.entries(data.files)
                .filter(([, builds]) => Array.isArray(builds) && builds.length > 0)
                .sort(([left], [right]) => right.localeCompare(left));
            if (groups.length === 0) throw new Error("No nightly builds found");

            list.replaceChildren();
            const renderGroups = (from, to) => {
                const fragment = document.createDocumentFragment();
                groups.slice(from, to).forEach(([date, builds], index) => fragment.append(makeRelease(date, builds, from === 0 && index === 0)));
                list.append(fragment);
            };
            renderGroups(0, initialGroupCount);

            const latest = groups[0];
            const totalArchives = groups.reduce((count, [, builds]) => count + builds.length, 0);
            status.textContent = `Latest: ${latest[0]} · ${latest[1].length} ${latest[1].length === 1 ? "archive" : "archives"}`;

            if (groups.length > initialGroupCount) {
                const more = element("button", "nightly-show-more", `Show ${groups.length - initialGroupCount} older build dates`);
                more.type = "button";
                more.addEventListener("click", () => {
                    renderGroups(initialGroupCount, groups.length);
                    more.remove();
                    status.textContent = `${groups.length} build dates · ${totalArchives} archives`;
                });
                list.append(more);
            }
        })
        .catch(showError);
});

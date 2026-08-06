window.addEventListener("DOMContentLoaded", () => {
    const headers = [...document.querySelectorAll(".article-body h1[id], .article-body h2[id], .article-body h3[id], .article-body h4[id]")];
    const toc = document.querySelector("#TableOfContents");
    const header = document.querySelector(".site-header");

    if (headers.length > 0 && toc && header) {
        const sectionVisibility = new Map();
        const headerHeight = header.offsetHeight || 0;
        const observerForTableOfContentActiveState = new IntersectionObserver(entries => {
            for (const entry of entries) {
                sectionVisibility.set(entry.target.getAttribute("id"), entry.isIntersecting);
            }

            for (const [sectionId, isVisible] of sectionVisibility) {
                if (!isVisible) {
                    continue;
                }

                clearActiveStatesInTableOfContents(toc);
                const escapedSectionId = window.CSS && CSS.escape ? CSS.escape(sectionId) : sectionId.replace(/"/g, '\\"');
                const anchor = toc.querySelector(`li a[href="#${escapedSectionId}"]`);
                if (anchor && anchor.parentElement) {
                    anchor.parentElement.classList.add("active");
                    anchor.scrollIntoView({ block: "nearest" });
                }
                break;
            }
        }, { rootMargin: `${headerHeight}px 0px 0px 0px`, threshold: 1.0 });

        headers.forEach(headerElement => {
            sectionVisibility.set(headerElement.getAttribute("id"), false);
            observerForTableOfContentActiveState.observe(headerElement);
        });
    }

    document.querySelectorAll("table").forEach(table => {
        if (table.className === "") {
            table.classList.add("content-table");
        }
    });
});

function clearActiveStatesInTableOfContents(toc) {
    toc.querySelectorAll("li").forEach(section => {
        section.classList.remove("active");
    });
}

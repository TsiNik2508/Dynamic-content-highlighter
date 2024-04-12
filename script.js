const rootElement = document.getElementById("root");
const testsSelect = document.getElementById("tests-select");

rootElement.addEventListener("onSolutionReady", (event) => {
  const { detail } = event;

  if (detail) {
    testsSelect.innerHTML = detail
      .map((t, index) => `<option value="${t.id}">${index + 1}</option>`)
      .join("");

    rootElement.innerHTML = detail[0].content;

    testsSelect.addEventListener("change", (e) => {
      const test = detail.find((t) => t.id === e.target.value);
      rootElement.innerHTML = test.content;
    });
  }
});

const onSolutionReady = new CustomEvent("onSolutionReady", {
  bubbles: true,
  cancelable: true,
  composed: false,
  detail: [
    {
      id: "f38d0cca-167c-46dc-9504-69ebe13c1e47",
      comment:
        "One text node. Content contains in the middle of a single tag",
      content: `<p>sit amet, Lorem ipsum. Sed non risus</p>`,
      searchFor: "Lorem ipsum",
    },
    {
      id: "20b81641-b065-492d-801a-e786d2a6894b",
      comment: "One text node. Content contains in the end of a single tag",
      content: `<p>Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, Lorem ipsum</p>`,
      searchFor: "Lorem ipsum",
    },
    {
      id: "c8b707f7-91e9-4778-acc6-4f06849bd323",
      comment: "One text node and content contains in a single tag",
      content: `
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
          `,
      searchFor: "Lorem ipsum",
    },
    {
      id: "eb375bed-bf98-4150-b8ac-711a6c0fe33a",
      comment:
        "The two text nodes and content are contained in sibling tags",
      content: `
          <div><p>Lorem </p><p>ipsum</p></div>
          `,
      searchFor: "Lorem ipsum",
    },
  ],
});

document.getElementById("root").dispatchEvent(onSolutionReady);

const root = document.getElementById("root");
const siteSearch = document.getElementById("site-search");
const selectTest = document.getElementById("tests-select");

siteSearch.addEventListener("input", highlight);
selectTest.addEventListener("change", highlight);

function highlight() {
  const searchText = siteSearch.value.trim().toLowerCase();
  const selectedTestId = selectTest.value;
  if (!searchText) {
    return;
  }

  const selectedTestContent = onSolutionReady.detail.find(
    (test) => test.id === selectedTestId
  ).content;

  const searchRegex = new RegExp(searchText.replace(/\s+/g, "\\s*"), "gi");

  root.innerHTML = selectedTestContent.replace(
    searchRegex,
    (match) => `<span class="search-results">${match}</span>`
  );
}

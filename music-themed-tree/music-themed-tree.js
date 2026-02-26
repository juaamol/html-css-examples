const composers = [
  "J.S. Bach",
  "L. v. Beethoven",
  "W.A. Mozart",
  "Frédéric Chopin",
  "Antonio Vivaldi",
];

const works = [
  "Mass in B Minor",
  "Symphony No. 5",
  "The Marriage of Figaro",
  "Nocturne Op. 9 No. 2",
  "The Four Seasons",
];

/**
 * 2. Main function to initialize search behavior
 * @param {string} inputId - ID of the text input
 * @param {string} resultsId - ID of the <ul> tree-list
 * @param {Array} dataSet - Array of strings to filter
 */
function initMusicSearch(inputId, resultsId, dataSet) {
  const input = document.getElementById(inputId);
  const resultsList = document.getElementById(resultsId);

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase().trim();
    resultsList.innerHTML = "";

    input.classList.remove("valid", "invalid");

    if (query.length > 0) {
      const matches = dataSet.filter((item) =>
        item.toLowerCase().includes(query),
      );

      if (matches.length > 0) {
        resultsList.classList.remove("hidden");

        matches.forEach((match) => {
          const li = document.createElement("li");
          li.className = "tree-node";

          li.innerHTML = `
                        <div class="node-row">
                            <span class="note-icon"><span>𝅝</span></span>
                            <span class="node-text">${match}</span>
                        </div>
                    `;

          li.addEventListener("click", (e) => {
            e.stopPropagation();
            input.value = match;
            input.classList.add("valid");
            resultsList.classList.add("hidden");
          });

          resultsList.appendChild(li);
        });
      } else {
        resultsList.classList.add("hidden");
      }
    } else {
      resultsList.classList.add("hidden");
    }
  });

  document.addEventListener("click", (event) => {
    const isClickInside =
      input.contains(event.target) || resultsList.contains(event.target);

    if (!isClickInside) {
      resultsList.classList.add("hidden");

      if (input.value.trim() !== "") {
        const exactMatch = dataSet.find(
          (item) => item.toLowerCase() === input.value.toLowerCase(),
        );
        if (exactMatch) {
          input.value = exactMatch;
          input.classList.add("valid");
          input.classList.remove("invalid");
        } else {
          input.classList.add("invalid");
          input.classList.remove("valid");
        }
      } else {
        input.classList.remove("valid", "invalid");
      }
    }
  });

  input.addEventListener("focus", () => {
    if (input.value.trim() !== "" && resultsList.innerHTML !== "") {
      resultsList.classList.remove("hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initMusicSearch("composer-input", "composer-results", composers);
  initMusicSearch("work-input", "work-results", works);
});

"use strict";

  const TERM_ALTERNATIVES = [
    { term: "chairman", alternative: "chairperson" },
    { term: "chairwoman", alternative: "chairperson" },
    { term: "vice chairman", alternative: "vice chair" },
    { term: "vice chairwoman", alternative: "vice chair" },
    { term: "policeman", alternative: "police officer" },
    { term: "policewoman", alternative: "police officer" },
    { term: "fireman", alternative: "firefighter" },
    { term: "firewoman", alternative: "firefighter" },
    { term: "stewardess", alternative: "flight attendant" },
    { term: "steward", alternative: "flight attendant (depending on context)" },
    { term: "mankind", alternative: "humankind" },
    { term: "manpower", alternative: "workforce" },
    { term: "businessman", alternative: "businessperson" },
    { term: "businesswoman", alternative: "businessperson" },
    { term: "mailman", alternative: "mail carrier" },
    { term: "salesman", alternative: "salesperson" },
    { term: "saleswoman", alternative: "salesperson" },
    { term: "congressman", alternative: "member of Congress" },
    { term: "congresswoman", alternative: "member of Congress" },
    { term: "man-made", alternative: "human-made" },
    { term: "waitress", alternative: "server" },
    { term: "waiter", alternative: "server" },
    { term: "stuntman", alternative: "stunt performer" },
    { term: "anchorman", alternative: "news anchor" },
    { term: "weatherman", alternative: "weather presenter" },
    { term: "repairman", alternative: "repair technician" },
    { term: "deliveryman", alternative: "delivery worker" },
    { term: "spokesman", alternative: "spokesperson" },
    { term: "spokeswoman", alternative: "spokesperson" },
    { term: "freshman", alternative: "first-year student" },
    { term: "foreman", alternative: "supervisor" },
    { term: "cameraman", alternative: "camera operator" },
    { term: "fisherman", alternative: "fisher" },
    { term: "craftsman", alternative: "craftsperson" },
    { term: "sportsman", alternative: "athlete" },
    { term: "sportswoman", alternative: "athlete" },
    { term: "he", alternative: "they" },
    { term: "she", alternative: "they" },
    { term: "her", alternative: "them / their" },
    { term: "his", alternative: "their" },
    { term: "him", alternative: "them" },
    { term: "himself", alternative: "themself / themselves" },
    { term: "herself", alternative: "themself / themselves" }
  ];

  const fileInput = document.getElementById("fileInput");
  const fileName = document.getElementById("fileName");
  const textInput = document.getElementById("textInput");
  const analyzeBtn = document.getElementById("analyzeBtn");
  const sampleBtn = document.getElementById("sampleBtn");
  const clearBtn = document.getElementById("clearBtn");
  const statusEl = document.getElementById("status");
  const resultsBody = document.getElementById("resultsBody");
  const totalOccurrences = document.getElementById("totalOccurrences");
  const noTerms = document.getElementById("noTerms");

  let currentText = "";

  function setStatus(msg, type = "") {
    statusEl.textContent = msg;
    statusEl.className = "status-msg" + (type ? " " + type : "");
  }

  function escapeRegex(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function makeTermRegex(term) {
    const escaped = escapeRegex(term);
    return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "giu");
  }

  function countMatches(text, term) {
    const regex = makeTermRegex(term);
    return Array.from(text.matchAll(regex)).length;
  }

  function analyzeText(text) {
    const results = [];
    for (const entry of TERM_ALTERNATIVES) {
      const count = countMatches(text, entry.term);
      if (count > 0) results.push({ ...entry, count });
    }
    return results;
  }

  function renderResults(results) {
    resultsBody.innerHTML = "";

    const total = results.reduce((sum, item) => sum + item.count, 0);
    totalOccurrences.textContent = String(total);

    if (results.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 3;
      cell.className = "empty-message";
      cell.textContent = "No matching terms to display.";
      row.appendChild(cell);
      resultsBody.appendChild(row);
      noTerms.hidden = false;
      return;
    }

    noTerms.hidden = true;

    for (const item of results) {
      const row = document.createElement("tr");
      const cellTerm = document.createElement("td");
      cellTerm.textContent = item.term;
      const cellCount = document.createElement("td");
      cellCount.textContent = String(item.count);
      const cellAlt = document.createElement("td");
      cellAlt.textContent = item.alternative;
      row.appendChild(cellTerm);
      row.appendChild(cellCount);
      row.appendChild(cellAlt);
      resultsBody.appendChild(row);
    }
  }

  function runAnalysis() {
    let textToAnalyze = textInput.value;

    if (!textToAnalyze.trim() && currentText.trim()) {
      textToAnalyze = currentText;
    }

    if (!textToAnalyze.trim()) {
      renderResults([]);
      setStatus("No text to analyse. Please choose a .txt file, paste text, or load the sample.", "error");
      return;
    }

    if (!textInput.value.trim() && currentText.trim()) {
      textInput.value = currentText;
    }

    const results = analyzeText(textToAnalyze);
    renderResults(results);

    if (results.length === 0) {
      setStatus("Analysis complete. No predefined gender-specific terms were detected.", "success");
    } else {
      setStatus(`Analysis complete. Found ${results.length} distinct term(s) and ${totalOccurrences.textContent} total occurrence(s).`, "success");
    }
  }

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files && fileInput.files[0];
    currentText = "";
    if (!file) {
      fileName.textContent = "no file selected";
      setStatus("Choose a .txt file, or paste text above.");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".txt") && file.type !== "text/plain") {
      fileName.textContent = file.name;
      setStatus("Unsupported file format. Please choose a plain-text .txt file.", "error");
      fileInput.value = "";
      return;
    }

    try {
      currentText = await file.text();
      fileName.textContent = `${file.name} (${file.size} bytes)`;
      textInput.value = currentText;
      if (!currentText.trim()) {
        setStatus("The selected file is empty. Please choose a file with readable text.", "error");
      } else {
        setStatus("File loaded into the text box. Click “Analyze text” to see results.");
      }
    } catch (error) {
      currentText = "";
      setStatus("The file could not be read. Please try another .txt file.", "error");
    }
  });

  textInput.addEventListener("input", () => {
    if (textInput.value !== currentText) {
      currentText = "";
      fileName.textContent = "no file selected";
    }
  });

  analyzeBtn.addEventListener("click", runAnalysis);

  sampleBtn.addEventListener("click", () => {
    const sample = "The chairman thanked the fireman and the policeman.\n" +
                   "Mankind has made many man-made tools.\n" +
                   "He said that his team would help him with his work.\n" +
                   "The word \"the\" should not count as the whole word \"he\".";
    textInput.value = sample;
    currentText = sample;
    fileInput.value = "";
    fileName.textContent = "built-in sample text";
    setStatus("Sample text loaded. Click “Analyze text” to see the results.");
    renderResults([]);
  });

  clearBtn.addEventListener("click", () => {
    currentText = "";
    textInput.value = "";
    fileInput.value = "";
    fileName.textContent = "no file selected";
    totalOccurrences.textContent = "0";
    resultsBody.innerHTML = '<tr><td colspan="3" class="empty-message">No analysis results yet.</td></tr>';
    noTerms.hidden = true;
    setStatus("Cleared. Choose a .txt file, paste text, or load the sample to begin.");
  });

  renderResults([]);
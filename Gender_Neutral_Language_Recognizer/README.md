# Gender Neutral Language Recognizer

A small browser-based student project built with HTML, CSS, and JavaScript. It reads plain-text `.txt` files and identifies predefined gender-specific terms using regular expressions, then shows occurrence counts and suggested gender-neutral alternatives.

## Features

- Runs locally in a modern web browser; no installation or server is required.
- Opens plain-text `.txt` files.
- Includes 21 predefined terms and suggested alternatives.
- Case-insensitive matching (`CHAIRMAN`, `Chairman`, and `chairman` are recognized).
- Whole-term matching so `he` is not matched inside `the`.
- Results table shows each detected term, occurrence count, and alternative.
- Clear messages for empty text and unsupported file types.
- Does not automatically replace text; suggestions are for user review.

## How to run

1. Keep `index.html`, `style.css`, and `script.js` in the same folder.
2. Open `index.html` in a modern browser (Chrome, Edge, Firefox, or Safari).
3. Select a `.txt` file, then click **Analyze text**. Or click **Load sample text** to test the app.
4. Review the results table.

The app uses modern JavaScript regular-expression features, including Unicode property escapes and lookbehind. Use an up-to-date browser.

## Project files

- `index.html` — page structure and controls
- `style.css` — layout and visual styling
- `script.js` — predefined terms, regex matching, counting, and results display
- `sample.txt` — example input
- `expected-output.txt` — expected results for the sample file
- `PROJECT_REPORT.md` — short project report and regex explanation

## Recognition method

Each term is escaped for regular-expression use and searched with the `giu` flags:
- `g`: find all occurrences
- `i`: ignore capitalization
- `u`: enable Unicode-aware matching

The generated pattern uses a negative lookbehind and negative lookahead to prevent a match when the adjacent character is a Unicode letter, number, or underscore. This makes matching whole terms and phrases more accurate than substring matching.

## Limitations

- It supports `.txt` only; `.docx` and `.pdf` are not supported.
- Suggested alternatives depend on context. For example, pronouns such as `he`, `his`, and `him` should only be changed when appropriate to the person's pronouns and the sentence.
- It recognizes only terms in the predefined list. It is not an AI language model and does not infer gender or understand every sentence.


 const TERM_ALTERNATIVES = [
    { term: "chairman", alternative: "chairperson" },
    { term: "chairwoman", alternative: "chairperson" },
    { term: "vice chairman", alternative: "vice chair"},
    { term: "vice chairwoman", alternative: "vice chair"},
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
    { term: "salesman", alternative: "salesperson"},
    { term: "saleswoman", alternative: "salesperson"},
    { term: "sportsman", alternative: "athlete"},
    { term: "sportswoman", alternative: "athlete"},
    { term: "he", alternative: "they" },
    { term: "she",  alternative: "they" },
    { term: "her", alternative: "them / their" },
    { term: "his", alternative: "their" },
    { term: "him", alternative: "them" },
    { term: "himself", alternative: "themself / themselves"},
    { term: "herself", alternative: "themself / themselves"}
  ];

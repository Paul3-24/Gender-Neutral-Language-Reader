# Project Report: Gender Neutral Language Recognizer

## 1. Introduction

The Gender Neutral Language Recognizer is a browser-based application that scans a plain-text document for a predefined list of gender-specific words or phrases. When it finds a term, it displays the term, how many times it occurs, and a suggested gender-neutral alternative. The application is intended as a simple review aid; it does not automatically edit the source text.

## 2. Objectives

- Identify predefined gender-specific terms in a text file.
- Recognize terms regardless of capitalization.
- Match complete words or phrases rather than accidental substrings.
- Count the occurrences of each detected term.
- Present alternatives in a clear results table.
- Provide helpful messages for empty text and unsupported file formats.

## 3. Tools and technologies

- HTML5 for the page structure and file-selection control.
- CSS3 for layout and responsive styling.
- JavaScript for file reading, regular-expression matching, counting, and rendering results.
- A modern web browser to run the application locally.

## 4. Methodology

The user selects a `.txt` file. JavaScript reads its contents using the browser's `File.text()` method. The program then loops through a predefined term-and-alternative list. For each term, it builds a regular expression and counts all matches. Only terms with one or more matches are included in the results table.

The matching uses the flags `g`, `i`, and `u`:
- `g` means global matching, so every occurrence is found.
- `i` makes matching case-insensitive.
- `u` enables Unicode-aware regular-expression behavior.

The expression uses a negative lookbehind and negative lookahead to ensure the term is not immediately next to a Unicode letter, number, or underscore. For example, `he` can be found as a separate word, but it is not counted inside `the`. The expression is also escaped so punctuation in a predefined term, such as the hyphen in `man-made`, is treated literally.

## 5. Sample terms

| Gender-specific term | Suggested alternative |
|---|---|
| chairman | chairperson |
| chairwoman | chairperson |
| policeman | police officer |
| policewoman | police officer |
| fireman | firefighter |
| firewoman | firefighter |
| stewardess | flight attendant |
| steward | flight attendant (depending on context) |
| mankind | humankind |
| manpower | workforce |
| businessman | businessperson |
| businesswoman | businessperson |
| mailman | mail carrier |
| salesman | salesperson |
| saleswoman | salesperson |
| congressman | member of Congress |
| congresswoman | member of Congress |
| man-made | human-made |
| he | they (when the person's pronouns are unknown) |
| his | their (when the person's pronouns are unknown) |
| him | them (when the person's pronouns are unknown) |

## 6. Testing

| Test case | Input or action | Expected behavior |
|---|---|---|
| Case-insensitive match | `CHAIRMAN`, `Chairman`, `chairman` | Each spelling is detected |
| Whole-word matching | `he` and `the` | `he` is counted only as a separate word |
| Repeated term | `fireman fireman` | `fireman` count is 2 |
| No match | `The team finished the report.` | Displays “No predefined gender-specific terms were detected.” |
| Empty file | Empty `.txt` file | Displays a clear empty-file message |
| Unsupported file | Select a non-text file | Displays an unsupported-format message |
| Sample file | Load or select `sample.txt` | Results match `expected-output.txt` |

## 7. Limitations

The application recognizes only the terms in its predefined list. It does not understand the full meaning of the document, and some alternatives may not fit every context. Pronoun suggestions should be reviewed carefully and used only when appropriate. The current version supports plain-text `.txt` files; `.docx` and `.pdf` are not supported.

## 8. Conclusion

The project demonstrates how regular expressions can be used for simple text recognition. It meets the core requirements by recognizing terms case-insensitively, matching whole terms, counting occurrences, suggesting alternatives, and displaying results in a table. The modular HTML, CSS, and JavaScript files make the project straightforward to test and extend.

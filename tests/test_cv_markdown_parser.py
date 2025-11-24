import pathlib
import sys

import pytest

# Ensure root path is in sys.path
sys.path.append(str(pathlib.Path(__file__).resolve().parents[1]))

from scripts.cv_markdown_to_json import parse_markdown_cv


def test_parse_markdown_cv_handles_markdown_headings_and_emojis(tmp_path):
    md_content = """---
foo: bar
---
## 🎓 Education
- item 1
## 💼 Experience
- item 2
"""
    md_file = tmp_path / "cv.md"
    md_file.write_text(md_content, encoding="utf-8")

    sections = parse_markdown_cv(md_file)

    assert sections["Education"].strip() == "- item 1"
    assert sections["Experience"].strip() == "- item 2"

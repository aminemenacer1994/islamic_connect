import json
import re
from pathlib import Path


def normalize_term(s: str) -> str:
    if s is None:
        return ''
    s = s.strip().lower()
    s = s.replace('’', "'").replace('`', "'").replace('–', '-')
    s = re.sub(r"\s+", " ", s)
    return s


def score_entry(e: dict) -> int:
    meaning = (e.get('meaning') or '').strip()
    example = (e.get('example') or '').strip()
    reference = (e.get('reference') or '').strip()
    return len(meaning) * 2 + len(example) + (10 if reference else 0)


def main():
    p = Path('resources/js/components/islamic_terms.json')
    data = json.loads(p.read_text(encoding='utf-8'))
    terms = data.get('terms', [])

    best_by_key = {}
    for e in terms:
        key = normalize_term(e.get('term', ''))
        cur = best_by_key.get(key)
        if cur is None:
            best_by_key[key] = e
            continue
        s_new = score_entry(e)
        s_old = score_entry(cur)
        if (s_new > s_old) or (s_new == s_old and e.get('id', 1_000_000_000) < cur.get('id', 1_000_000_000)):
            best_by_key[key] = e

    unique = sorted(best_by_key.values(), key=lambda x: x.get('id', 0))
    data['terms'] = unique
    p.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding='utf-8')

    print('original_count', len(terms))
    print('unique_count', len(unique))


if __name__ == '__main__':
    main()

